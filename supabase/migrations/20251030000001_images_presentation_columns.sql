-- Presentation metadata for mystery background images

alter table public.images
  add column if not exists resize_mode text not null default 'contain'
    constraint images_resize_mode_check check (resize_mode in ('cover', 'contain'));

alter table public.images
  add column if not exists rotate_every_n_hail_marys integer
    constraint images_rotate_every_check check (
      rotate_every_n_hail_marys is null or rotate_every_n_hail_marys >= 1
    );
