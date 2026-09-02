-- ============================================================
-- BAQALA TRADER — Migration 2: shopkeeper requests
-- Run this in: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- 1. Add a PIN to each shop, so shopkeepers can identify themselves
--    on the public order page without needing an account.
alter table bt_shops add column pin text unique;

-- 2. Allow orders to start as "requested" (submitted by shopkeeper,
--    not yet priced by you) before becoming due/partial/paid.
alter table bt_orders drop constraint if exists bt_orders_status_check;
alter table bt_orders add constraint bt_orders_status_check
  check (status in ('requested','paid','due','partial'));
