import { MetaFunction, LoaderFunction, ActionFunction } from "remix";

import { useLoaderData, json, redirect, useFormAction } from "remix";

import { Link } from "react-router-dom";

import { prisma } from "~/prisma.server";

import type { CertificateWithArtist } from "~/types";

type RouteData = {
  certificates: CertificateWithArtist[];
};

export const loader: LoaderFunction = async () => {
  const certificates = await prisma.certificate.findMany({
    include: { artist: true },
  });

  return json({
    certificates,
  });
};

export const meta: MetaFunction = ({ data }: { data: RouteData }) => {
  return {
    title: "Verisart",
    description: `We've got ${data.certificates.length} for ya`,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());

  console.log("AAAAAAA", body.get("id"));

  await prisma.artist.delete({
    where: {
      certificateId: Number(body.get("id")),
    },
  });

  await prisma.certificate.delete({
    where: {
      id: Number(body.get("id")),
    },
  });

  return redirect("/");
};

export default function Index() {
  const { certificates } = useLoaderData<RouteData>();

  const onDelete = async (id: number) => {
    await prisma.certificate.delete({
      where: {
        id,
      },
    });
  };

  return (
    <div>
      <div className="mb-4 pb-4 border-b">
        <Link to="/new" className="btn btn-primary">
          New Certificate
        </Link>
      </div>

      {certificates.map((certificate) => (
        <div key={certificate.id}>
          <span>{certificate.artist.firstName}</span>
          <span>{certificate.artist.lastName}</span>

          <Link
            to={`/${certificate.id}/edit`}
            className="btn btn-accent btn-sm"
          >
            Edit
          </Link>

          <button
            className="btn btn-sm"
            formAction={useFormAction("destroy")}
            formMethod="DELETE"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
