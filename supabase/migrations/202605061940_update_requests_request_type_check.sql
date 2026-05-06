alter table public.requests
  drop constraint if exists requests_request_type_check;

alter table public.requests
  add constraint requests_request_type_check check (
    request_type in (
      'CAF',
      'RSA',
      'Prime d''activite',
      'caf',
      'rsa',
      'prime-activite',
      'chomage',
      'aide-logement',
      'logement-social',
      'securite-sociale',
      'retraite',
      'impots',
      'ants',
      'urssaf',
      'resiliation',
      'contestation',
      'lettre-proprietaire',
      'aide-financiere'
    )
  ) not valid;
