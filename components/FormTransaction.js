import { Combobox, RadioGroup, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  HiArrowSmDown,
  HiArrowSmUp,
  HiOutlineSelector,
  HiOutlineCheck,
} from "react-icons/hi";
import { timestamp } from "../firebase/config";
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";

const kategoriOptions = [
  {
    id: 1,
    name: "primer",
  },
  {
    id: 2,
    name: "sekunder",
  },
  {
    id: 3,
    name: "tersier",
  },
];

function FormTransaction() {
  const [tanggal, setTanggal] = useState("");
  const [jenis, setJenis] = useState("expense");
  const [deskripsi, setDeskripsi] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedKategori, setSelectedKategori] = useState({ id: 0, name: "" });
  const [query, setQuery] = useState("");

  const { user } = useAuthContext();

  const {
    addDocument,
    response: { isPending, isSuccess, document },
  } = useFirestore(`users/${user.uid}/transactions`);

  const filteredKategori =
    query === ""
      ? kategoriOptions
      : kategoriOptions.filter((kat) =>
          kat.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  function handleAddTransaction(e) {
    e.preventDefault();
    const doc = {
      tanggal: timestamp.fromDate(new Date(tanggal)),
      jenis,
      deskripsi,
      kategori: selectedKategori,
      amount,
    };
    addDocument(doc);
  }

  useEffect(() => {
    if (isSuccess) {
      setAmount(0);
      setDeskripsi("");
      setJenis("expense");
      setSelectedKategori({ id: 0, name: "" });
      setTanggal("");
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleAddTransaction} className="space-y-4 mt-4">
      <div className="flex items-center space-x-3">
        <RadioGroup value={jenis} onChange={setJenis}>
          <RadioGroup.Label className="sr-only">
            Income / Expense
          </RadioGroup.Label>
          <div className="space-x-2 flex items-center">
            {["income", "expense"].map((arr, i) => (
              <RadioGroup.Option
                key={i}
                value={arr}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-offset-2 ring-offset-violet-300 ring-blue-300 ring-opacity-60"
                      : ""
                  }
              ${
                checked
                  ? "bg-violet-300 border border-violet-900"
                  : "bg-violet-200 border border-violet-300"
              }
                relative rounded-lg shadow-md shadow-violet-400/50 dark:shadow-neutral-900 p-2 cursor-pointer flex flex-col focus:outline-none`
                }
                disabled={isPending}
              >
                {({ active, checked }) => {
                  return (
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label as="p" className={`font-normal`}>
                          {arr !== "income" ? (
                            <HiArrowSmUp className={"text-red-700"} />
                          ) : (
                            <HiArrowSmDown className={"text-green-700"} />
                          )}
                        </RadioGroup.Label>
                      </div>
                    </div>
                  );
                }}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <div className="uppercase px-2 py-1 rounded-md border border-violet-900 text-xs bg-violet-300 text-violet-900">
          {jenis}
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-2">
        <label>Kategori</label>
        <Combobox
          disabled={isPending}
          value={selectedKategori}
          onChange={setSelectedKategori}
        >
          <div className="relative mt-1">
            <div className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-blue-300 focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
              <Combobox.Input
                className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                displayValue={(kat) => kat.name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <HiOutlineSelector
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredKategori.length === 0 && query !== "" ? (
                  <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredKategori.map((kat) => (
                    <Combobox.Option
                      key={kat.id}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active ? "text-white bg-violet-600" : "text-gray-900"
                        }`
                      }
                      value={kat}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {kat.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-violet-600"
                              }`}
                            >
                              <HiOutlineCheck
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
      <div className="flex flex-col justify-center space-y-2">
        <label>Tanggal</label>
        <input
          type="date"
          className="form-input input-theme"
          onChange={(e) => setTanggal(e.target.value)}
          disabled={isPending}
          required
        />
      </div>
      <div className="flex flex-col justify-center space-y-2">
        <label>Deskripsi</label>
        <textarea
          className="form-textarea input-theme h-20 resize-none"
          onChange={(e) => setDeskripsi(e.target.value)}
          value={deskripsi}
          disabled={isPending}
          required
        />
      </div>
      <div className="flex flex-col justify-center space-y-2">
        <label>Amount</label>
        <input
          type="number"
          className="input-theme"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          disabled={isPending}
          required
        />
      </div>
      <div className="flex flex-col justify-center space-y-2">
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-xl bg-violet-300 shadow-xl shadow-violet-200 dark:shadow-neutral-900 text-violet-900 border border-transparent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          disabled={isPending}
        >
          {isPending ? "Loading" : "Tambah"}
        </button>
      </div>
    </form>
  );
}

export default FormTransaction;
