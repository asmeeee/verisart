import { FunctionComponent } from "react";

import { Form } from "remix";

type Props = {
  values?: {
    id?: number;
    title?: string;
    year?: number;

    artist?: {
      firstName?: string;
      lastName?: string;
    };
  };

  isPending: boolean;
};

export const CertificateForm: FunctionComponent<Props> = ({
  values,
  isPending,
}) => {
  return (
    <Form method="post" className="space-y-4">
      <fieldset className="p-4 border" disabled={isPending}>
        <legend className="px-1 font-medium">Certificate</legend>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>

          <input
            type="text"
            name="title"
            className="input input-bordered"
            defaultValue={values?.title || ""}
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
            defaultValue={values?.year || ""}
            required
          />
        </div>
      </fieldset>

      <fieldset className="p-4 border" disabled={isPending}>
        <legend className="px-1 font-medium">Artist</legend>

        <div className="form-control">
          <label className="label">
            <span className="label-text">First name</span>
          </label>

          <input
            type="text"
            name="artistFirstName"
            className="input input-bordered"
            defaultValue={values?.artist?.firstName || ""}
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
            defaultValue={values?.artist?.lastName || ""}
            required
          />
        </div>
      </fieldset>

      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          {values?.id
            ? `Updat${isPending ? "ing" : "e"} Certificate`
            : `Creat${isPending ? "ing" : "e"} Certificate`}
        </button>
      </div>
    </Form>
  );
};

export default CertificateForm;
