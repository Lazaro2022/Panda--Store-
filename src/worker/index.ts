import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  getOAuthRedirectUrl,
  exchangeCodeForSessionToken,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import { getCookie, setCookie } from "hono/cookie";
import {
  CategoriaSchema,
  ProdutoComCategoriaSchema,
  CreateProdutoSchema,
  UpdateProdutoSchema,
  EstatisticasSchema,
} from "@/shared/types";
import "@/worker/types";

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors());

// ==================== AUTH ENDPOINTS ====================

app.get("/api/oauth/google/redirect_url", async (c) => {
  const redirectUrl = await getOAuthRedirectUrl("google", {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get("/api/logout", async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === "string") {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// ==================== PUBLIC ENDPOINTS ====================

app.get("/api/categorias", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM categorias ORDER BY nome"
  ).all();

  return c.json(results.map((r) => CategoriaSchema.parse(r)));
});

app.get("/api/produtos", async (c) => {
  const categoria = c.req.query("categoria");
  const busca = c.req.query("busca");
  const limit = parseInt(c.req.query("limit") || "50");
  const offset = parseInt(c.req.query("offset") || "0");

  let query = `
    SELECT 
      p.*,
      c.nome as categoria_nome,
      c.slug as categoria_slug
    FROM produtos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    WHERE p.is_ativo = 1
  `;

  const params: (string | number)[] = [];

  if (categoria) {
    query += " AND c.slug = ?";
    params.push(categoria);
  }

  if (busca) {
    query += " AND (p.nome LIKE ? OR p.descricao LIKE ? OR p.marca LIKE ?)";
    const searchTerm = `%${busca}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  query += " ORDER BY p.is_destaque DESC, p.created_at DESC LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const { results } = await c.env.DB.prepare(query).bind(...params).all();

  return c.json(results.map((r) => ProdutoComCategoriaSchema.parse(r)));
});

app.get("/api/produtos/:id", async (c) => {
  const id = c.req.param("id");

  const { results } = await c.env.DB.prepare(
    `SELECT 
      p.*,
      c.nome as categoria_nome,
      c.slug as categoria_slug
    FROM produtos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    WHERE p.id = ? AND p.is_ativo = 1`
  )
    .bind(id)
    .all();

  if (results.length === 0) {
    return c.json({ error: "Produto não encontrado" }, 404);
  }

  return c.json(ProdutoComCategoriaSchema.parse(results[0]));
});

// ==================== ADMIN ENDPOINTS ====================

app.get("/api/admin/estatisticas", authMiddleware, async (c) => {
  const totalProdutos = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM produtos"
  )
    .first<{ count: number }>();

  const produtosDestaque = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM produtos WHERE is_destaque = 1"
  )
    .first<{ count: number }>();

  const produtosEstoqueBaixo = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM produtos WHERE estoque < 10 AND estoque > 0"
  )
    .first<{ count: number }>();

  const produtosInativos = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM produtos WHERE is_ativo = 0"
  )
    .first<{ count: number }>();

  return c.json(
    EstatisticasSchema.parse({
      total_produtos: totalProdutos?.count || 0,
      produtos_destaque: produtosDestaque?.count || 0,
      produtos_estoque_baixo: produtosEstoqueBaixo?.count || 0,
      produtos_inativos: produtosInativos?.count || 0,
    })
  );
});

app.get("/api/admin/produtos", authMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT 
      p.*,
      c.nome as categoria_nome,
      c.slug as categoria_slug
    FROM produtos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    ORDER BY p.created_at DESC`
  ).all();

  return c.json(results.map((r) => ProdutoComCategoriaSchema.parse(r)));
});

app.post("/api/admin/produtos", authMiddleware, async (c) => {
  const body = await c.req.json();
  const data = CreateProdutoSchema.parse(body);

  const result = await c.env.DB.prepare(
    `INSERT INTO produtos (
      nome, descricao, preco, preco_promocional, categoria_id, 
      marca, estoque, especificacoes, is_ativo, is_destaque, imagem_principal
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      data.nome,
      data.descricao || null,
      data.preco,
      data.preco_promocional || null,
      data.categoria_id || null,
      data.marca || null,
      data.estoque,
      data.especificacoes || null,
      data.is_ativo ? 1 : 0,
      data.is_destaque ? 1 : 0,
      data.imagem_principal || null
    )
    .run();

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM produtos WHERE id = ?"
  )
    .bind(result.meta.last_row_id)
    .all();

  return c.json(results[0], 201);
});

app.put("/api/admin/produtos/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const data = UpdateProdutoSchema.parse(body);

  const updates: string[] = [];
  const params: (string | number | null)[] = [];

  if (data.nome !== undefined) {
    updates.push("nome = ?");
    params.push(data.nome);
  }
  if (data.descricao !== undefined) {
    updates.push("descricao = ?");
    params.push(data.descricao || null);
  }
  if (data.preco !== undefined) {
    updates.push("preco = ?");
    params.push(data.preco);
  }
  if (data.preco_promocional !== undefined) {
    updates.push("preco_promocional = ?");
    params.push(data.preco_promocional || null);
  }
  if (data.categoria_id !== undefined) {
    updates.push("categoria_id = ?");
    params.push(data.categoria_id || null);
  }
  if (data.marca !== undefined) {
    updates.push("marca = ?");
    params.push(data.marca || null);
  }
  if (data.estoque !== undefined) {
    updates.push("estoque = ?");
    params.push(data.estoque);
  }
  if (data.especificacoes !== undefined) {
    updates.push("especificacoes = ?");
    params.push(data.especificacoes || null);
  }
  if (data.is_ativo !== undefined) {
    updates.push("is_ativo = ?");
    params.push(data.is_ativo ? 1 : 0);
  }
  if (data.is_destaque !== undefined) {
    updates.push("is_destaque = ?");
    params.push(data.is_destaque ? 1 : 0);
  }
  if (data.imagem_principal !== undefined) {
    updates.push("imagem_principal = ?");
    params.push(data.imagem_principal || null);
  }

  updates.push("updated_at = CURRENT_TIMESTAMP");
  params.push(id);

  await c.env.DB.prepare(
    `UPDATE produtos SET ${updates.join(", ")} WHERE id = ?`
  )
    .bind(...params)
    .run();

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM produtos WHERE id = ?"
  )
    .bind(id)
    .all();

  if (results.length === 0) {
    return c.json({ error: "Produto não encontrado" }, 404);
  }

  return c.json(results[0]);
});

app.delete("/api/admin/produtos/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");

  await c.env.DB.prepare("DELETE FROM produtos WHERE id = ?").bind(id).run();

  return c.json({ success: true });
});

export default app;
