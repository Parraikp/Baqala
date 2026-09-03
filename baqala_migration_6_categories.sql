-- ============================================================
-- BAQALA TRADER — Migration 6: product categories
-- Run this in: Supabase Dashboard > SQL Editor > New query
-- ============================================================

alter table bt_products add column category text;
