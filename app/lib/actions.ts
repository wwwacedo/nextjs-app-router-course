"use server"; // to mark all the exported functions within the file as Server Actions

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  // coerce (change) from a string to a number while also validating its type
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // const rawFormData = Object.fromEntries(formData.entries())
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  /** 
	 It's usually good practice to store 
	 monetary values in cents in your database 
	 to eliminate JavaScript floating-point 
	 errors and ensure greater accuracy.
	 * */

  const amountInCents = amount * 100;

  // create a new date with the format "YYYY-MM-DD"
  const date = new Date().toISOString().split("T")[0];

  await sql`
	INSERT INTO invoices (customer_id, amount, status, date)
	VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;

  // to clear this cache and trigger a new request to the server
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  await sql`
	UPDATE invoices
	SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
	WHERE id = ${id}
`;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}


export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}