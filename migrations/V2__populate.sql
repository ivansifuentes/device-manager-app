INSERT INTO public.account (id,name,email) VALUES
	 ('565713ef-5a0c-4a03-8cbb-2e53889079c4'::uuid,'ivan',NULL),
	 ('7a811440-42b1-4dbb-9e9b-5d7b3c2e0bb2'::uuid,'jazmin',NULL),
	 ('3833d44f-7dc0-4ead-8fc4-a14fe17a331e'::uuid,'new guy',NULL);
INSERT INTO public.device (id,serial_number,model) VALUES
	 ('aba88958-9998-4423-a122-54a2d3cf3106'::uuid,'SERIAL01','GO3'),
	 ('ca607977-1e5d-43b1-98fd-560dd0f30512'::uuid,'SERIAL02','GO3'),
	 ('0a7e2294-7bfe-4638-939f-35ee8fcb936e'::uuid,'SERIAL03','GO6'),
	 ('05a77f84-9783-4ffe-bcf6-451e16363a31'::uuid,'1234-1234','X7'),
	 ('7c40922b-dd2b-4bc5-834a-5375c7891956'::uuid,'1234-xxdd','X7'),
	 ('bb03bda1-5cce-490e-96b6-037c8bf87724'::uuid,'11122223333','MX7'),
	 ('8fc8e9f2-6b8e-4d87-8309-bf0842ee41c8'::uuid,'seriAAA','Pongo 67R');
INSERT INTO public.account_device (id,account_id,device_id) VALUES
	 ('e3a80816-495d-4a6f-86bb-545f75b4e5e9'::uuid,'565713ef-5a0c-4a03-8cbb-2e53889079c4'::uuid,'7c40922b-dd2b-4bc5-834a-5375c7891956'::uuid),
	 ('d036ac6b-2256-418e-b983-3b8902093ab7'::uuid,'565713ef-5a0c-4a03-8cbb-2e53889079c4'::uuid,'bb03bda1-5cce-490e-96b6-037c8bf87724'::uuid),
	 ('f863f42d-5ca7-40f2-9e1f-0b806db6d8c5'::uuid,'3833d44f-7dc0-4ead-8fc4-a14fe17a331e'::uuid,'8fc8e9f2-6b8e-4d87-8309-bf0842ee41c8'::uuid);

