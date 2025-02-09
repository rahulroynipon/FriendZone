import { ErrorMessage } from "formik";
import { MdErrorOutline } from "react-icons/md";

export const FieldEorrorMessage = ({ name }) => {
  return (
    <ErrorMessage name={name} component="p">
      {(message) => (
        <p className="text-red-500 flex items-center gap-1 mt-1 text-xs">
          <MdErrorOutline size={14} />
          <span>{message}</span>
        </p>
      )}
    </ErrorMessage>
  );
};
