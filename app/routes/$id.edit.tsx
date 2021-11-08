import type { LoaderFunction, MetaFunction } from "remix";
import { useLoaderData, json } from "remix";

import { Link } from "react-router-dom";

import { prisma } from "~/prisma.server";

import { CertificateWithArtist } from "~/types";

type RouteData = {
  certificate: CertificateWithArtist;
};

export const loader: LoaderFunction = async ({ params }) => {
  const certificate = await prisma.certificate.findFirst({
    where: {
      id: Number(params.id),
    },

    include: {
      artist: true,
    },
  });

  if (!certificate) {
    return json({ id: params.id! }, { status: 404 });
  }

  return json({ certificate });
};

export const meta: MetaFunction = ({ data }: { data: RouteData }) => ({
  title: data.certificate
    ? `Editing ${data.certificate.title} by ${data.certificate.artist.firstName} ${data.certificate.artist.lastName}`
    : "Not Found",
});

export default function Edit() {
  const { certificate } = useLoaderData<RouteData>();

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-4 text-xl border-b">
        <h1>
          Edit <span className="font-medium">{certificate.title}</span>!
        </h1>

        <Link to="/" className="btn btn-accent btn-sm">
          Go back!
        </Link>
      </div>
    </div>
  );
}
