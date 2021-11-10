import {
  useLoaderData,
  RouteComponent,
  json,
  LoaderFunction,
  ActionFunction,
  MetaFunction,
  useTransition,
  redirect,
  Link,
} from "remix";

import { prisma } from "~/prisma.server";

import { CertificateWithArtist } from "~/types";

import { CertificateForm } from "~/components";

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

export const action: ActionFunction = async ({ request, params }) => {
  const body = new URLSearchParams(await request.text());

  await prisma.certificate.update({
    where: {
      id: Number(params.id),
    },

    data: {
      title: body.get("title") as string,
      year: Number(body.get("year")),

      artist: {
        update: {
          firstName: body.get("artistFirstName") as string,
          lastName: body.get("artistLastName") as string,
        },
      },
    },
  });

  return redirect("/");
};

const EditCertificateRoute: RouteComponent = () => {
  const { certificate } = useLoaderData<RouteData>();

  const transition = useTransition();

  const pendingForm = transition.submission;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-4 text-xl border-b">
        <h1>
          Edit <span className="font-medium">{certificate.title}</span>!
        </h1>

        <Link to="/" className="btn btn-accent btn-sm">
          Go back
        </Link>
      </div>

      <CertificateForm values={certificate} isPending={!!pendingForm} />
    </div>
  );
};

export default EditCertificateRoute;
