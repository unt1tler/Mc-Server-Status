/*
  # Create admin user and set up admin role

  1. Changes
    - Create admin user through auth.users() function
    - Set admin metadata
*/

-- Create admin user if not exists and set admin role
DO $$
DECLARE
  _user_id uuid;
BEGIN
  -- Try to find existing user
  SELECT id INTO _user_id
  FROM auth.users
  WHERE email = 'admin@admin.com';

  -- If user doesn't exist, create them
  IF _user_id IS NULL THEN
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      role,
      aud
    )
    VALUES (
      gen_random_uuid(),
      'admin@admin.com',
      crypt('admin@admin.cum', gen_salt('bf')),
      now(),
      jsonb_build_object(
        'provider', 'email',
        'providers', array['email']
      ),
      jsonb_build_object('is_admin', true),
      now(),
      now(),
      'authenticated',
      'authenticated'
    )
    RETURNING id INTO _user_id;
  ELSE
    -- Update existing user's metadata
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_build_object('is_admin', true),
        updated_at = now()
    WHERE id = _user_id;
  END IF;
END $$;