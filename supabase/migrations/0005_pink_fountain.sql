/*
  # Create admin user and role

  1. Changes
    - Create admin role function
    - Insert admin user
    - Grant admin role to user
*/

-- Function to set admin role
CREATE OR REPLACE FUNCTION set_admin_role()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert admin user if not exists
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@admin.com',
    crypt('admin@admin.cum', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"is_admin":true}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  )
  ON CONFLICT (email) DO UPDATE
  SET raw_user_meta_data = '{"is_admin":true}',
      updated_at = now();
END;
$$;

-- Execute the function
SELECT set_admin_role();