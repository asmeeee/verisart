import type { ActionFunction } from "remix";

import { useTransition, Form, redirect } from "remix";

import { Link } from "react-router-dom";

import { prisma } from "~/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());

  await prisma.certificate.create({
    data: {
      title: body.get("title") as string,
      year: Number(body.get("productionYear")),
      artist: {
        create: {
          firstName: body.get("artistFirstName") as string,
          lastName: body.get("artistLastName") as string,
        },
      },
    },
  });

  return redirect("/");
};

export default function New() {
  const transition = useTransition();

  const pendingForm = transition.submission;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <h1 className="text-xl">New Certificate!</h1>

        <Link to="/" className="btn btn-accent btn-sm">
          Go back!
        </Link>
      </div>

      <Form method="post" className="space-y-4">
        <fieldset className="p-4 border" disabled={!!transition.submission}>
          <legend className="px-1 font-medium">Certificate</legend>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>

            <input
              type="text"
              name="title"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Production year</span>
            </label>

            <input
              type="number"
              name="year"
              min="1"
              max="2021"
              className="input input-bordered"
              required
            />
          </div>
        </fieldset>

        <fieldset className="p-4 border" disabled={!!transition.submission}>
          <legend className="px-1 font-medium">Artist</legend>

          <div className="form-control">
            <label className="label">
              <span className="label-text">First name</span>
            </label>

            <input
              type="text"
              name="artistFirstName"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Last name</span>
            </label>

            <input
              type="text"
              name="artistLastName"
              className="input input-bordered"
              required
            />
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">
          Creat{pendingForm ? "ing" : "e"} Certificate
        </button>
      </Form>
    </div>
  );
}
