import { toast } from "sonner";
import cn from "../../lib/utils";

const CustomNotify = ({ type = "info", message }) => {
  const variants = {
    success: {
      header: "Success",
      clName: {
        bg: "bg-emerald-500",
        text: "text-emerald-400",
      },
      svg: (
        <svg
          className="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
      ),
    },
    error: {
      header: "Error",
      clName: {
        bg: "bg-red-500",
        text: "text-red-400",
      },
      svg: (
        <svg
          className="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
        </svg>
      ),
    },
    info: {
      header: "Info",
      clName: {
        bg: "bg-blue-500",
        text: "text-blue-400",
      },
      svg: (
        <svg
          className="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
        </svg>
      ),
    },
    warning: {
      header: "Warning",
      clName: {
        bg: "bg-yellow-400",
        text: "text-yellow-300",
      },
      svg: (
        <svg
          className="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
        </svg>
      ),
    },
  };

  const variant = variants[type] || variants.info;

  return (
    <div className="flex  max-w-sm w-full min-w-[20rem]  overflow-hidden rounded-lg shadow-md bg-gray-800 font-poppins">
      <div
        className={cn(
          "flex items-center justify-center w-12 shrink-0",
          variant.clName.bg
        )}
      >
        {variant.svg}
      </div>

      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span className={cn("font-semibold", variant.clName.text)}>
            {variant.header}
          </span>
          <p className="text-sm text-gray-200">{message}</p>
        </div>
      </div>
    </div>
  );
};

const ShowToast = (type, message) => {
  toast.custom((t) => <CustomNotify type={type} message={message} />);
};

export default ShowToast;
