-- Troca seis obras em baixa resolução por ficheiros maiores na Wikimedia Commons.
-- O app usa as URLs remotas antes das imagens embutidas. Sem esta migration, os
-- aparelhos continuam a mostrar as versões antigas.
-- Cada linha é localizada pelo mistério (type, sort_order) e pela posição na galeria.

update public.images i
set url = v.url,
    title = coalesce(v.title, i.title),
    artist = coalesce(v.artist, i.artist),
    description = coalesce(v.description, i.description)
from public.mysteries m,
  (values
    -- glorious-2-3: Jorge Afonso (297×307) → Mantegna, Ascensão (Uffizi)
    ('glorious', 2, 3,
     'https://upload.wikimedia.org/wikipedia/commons/6/66/Andrea_Mantegna_012.jpg',
     'The Ascension of Christ',
     'Andrea Mantegna',
     'Galleria degli Uffizi, Florença (painel esquerdo do Tríptico dos Uffizi). Domínio público (PD-Art; Commons)'),
    -- glorious-2-2: Perugino, Ascensão (Lyon), mesma obra em resolução maior
    ('glorious', 2, 2,
     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Pietro_Perugino_cat48c.jpg/1920px-Pietro_Perugino_cat48c.jpg',
     null, null, null),
    -- glorious-3-4: Duccio, Pentecostes (Maestà), mesma obra em resolução maior
    ('glorious', 3, 4,
     'https://upload.wikimedia.org/wikipedia/commons/f/f0/Duccio_di_Buoninsegna_018.jpg',
     null, null, null),
    -- luminous-4-1: Lotto, Transfiguração (Recanati), mesma obra em resolução maior
    ('luminous', 4, 1,
     'https://upload.wikimedia.org/wikipedia/commons/2/2c/Lorenzo_Lotto_065.jpg',
     null, null, null),
    -- luminous-4-2: Duccio, Transfiguração (Maestà), mesma obra em resolução maior
    ('luminous', 4, 2,
     'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Duccio_di_Buoninsegna_039.jpg/1920px-Duccio_di_Buoninsegna_039.jpg',
     null, null, null),
    -- joyful-4-4: Fra Angelico, Apresentação (San Marco, cela 10), mesma obra em resolução maior
    ('joyful', 4, 4,
     'https://upload.wikimedia.org/wikipedia/commons/8/84/Presentation_of_Jesus_at_the_Temple_by_Fra_Angelico_%28San_Marco_Cell_10%29.jpg',
     null, null, null)
  ) as v(mystery_type, mystery_sort_order, image_sort_order, url, title, artist, description)
where i.mystery_id = m.id
  and m.type::text = v.mystery_type
  and m.sort_order = v.mystery_sort_order
  and i.sort_order = v.image_sort_order;
