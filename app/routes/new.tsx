import {
  useTransition,
  RouteComponent,
  ActionFunction,
  redirect,
  Link,
} from "remix";

import { prisma } from "~/prisma.server";

import { CertificateForm } from "~/components";

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());

  await prisma.certificate.create({
    data: {
      title: body.get("title") as string,
      year: Number(body.get("year")),

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

const NewCertificateRoute: RouteComponent = () => {
  const transition = useTransition();

  const pendingForm = transition.submission;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <h1 className="text-xl">New Certificate!</h1>

        <Link to="/" className="btn btn-accent btn-sm">
          Go back
        </Link>
      </div>

      <CertificateForm isPending={!!pendingForm} />
    </div>
  );
};

export default NewCertificateRoute;
