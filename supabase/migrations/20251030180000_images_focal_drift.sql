-- Optional focal point and drift for the prayer artwork breathe.
-- Null means the shared default. Scale is not stored per image.

alter table public.images
  add column if not exists focal_x double precision,
  add column if not exists focal_y double precision,
  add column if not exists drift_x double precision,
  add column if not exists drift_y double precision;

alter table public.images drop constraint if exists images_focal_x_check;
alter table public.images drop constraint if exists images_focal_y_check;
alter table public.images drop constraint if exists images_drift_x_check;
alter table public.images drop constraint if exists images_drift_y_check;

alter table public.images
  add constraint images_focal_x_check check (focal_x is null or (focal_x >= 0 and focal_x <= 1)),
  add constraint images_focal_y_check check (focal_y is null or (focal_y >= 0 and focal_y <= 1)),
  add constraint images_drift_x_check check (drift_x is null or (drift_x >= -1 and drift_x <= 1)),
  add constraint images_drift_y_check check (drift_y is null or (drift_y >= -1 and drift_y <= 1));
