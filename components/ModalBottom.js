import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";

function ModalBottom({
  isOpen,
  closeModal,
  children,
  title = "",
  closeButton = false,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen text-center bg-neutral-900/50 dark:bg-violet-100/30">
          <Transition.Child
            as={Fragment}
            enter="ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-linear duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-10"
          >
            <div className="inline-block w-full max-w-md p-4 mt-8 overflow-hidden text-left align-bottom transition-all transform bg-violet-100 dark:bg-neutral-800 shadow-xl rounded-t-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-violet-900 dark:text-violet-400"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2 text-sm text-violet-700 dark:text-violet-200">
                {children}
              </div>

              {closeButton && (
                <div className="mt-4 flex w-full justify-center">
                  <button
                    type="button"
                    className="inline-flex w-40 justify-center px-2 py-1 text-xs font-medium text-violet-900 bg-violet-200 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    <HiChevronDown size={16} />
                  </button>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalBottom;
