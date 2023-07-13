import { X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { UserAuthProps } from "../../utils/interfaces";
import { useState } from "react";
import { DeleteUser } from "../../services/api";

interface UserProps {
  user: UserAuthProps;
  setIsLoading: Function;
  currentUsers: UserAuthProps[];
  setCurrentUsers: Function;
}

export function User({
  setIsLoading,
  user,
  currentUsers,
  setCurrentUsers,
}: UserProps) {
  const [isDialogClientDataOpen, setIsDialogClientDataOpen] = useState(false);

  const deleteUser = async (id: string) => {
    setIsLoading(true);
    await DeleteUser(id);
    let index = currentUsers.indexOf(user);
    let copiaArray = [...currentUsers];

    if (index !== -1) {
      copiaArray.splice(index, 1);
    }
    setCurrentUsers(copiaArray);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Dialog.Root
        open={isDialogClientDataOpen}
        onOpenChange={setIsDialogClientDataOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed outline-none bg-[#2f60d1] py-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-[600px]  text-[#14163c] rounded-lg w-[500px] telaMedia:w-[700px] shadow-lg shadow-black/40">
            <X
              className="absolute z-10  text-white hover:text-red-500 cursor-pointer right-4 top-4"
              onClick={() => {
                setIsDialogClientDataOpen(false);
              }}
              size={30}
            />
            <div className="w-[100%] text-white text-lg font-bold rounded-lg mt-4 !p-4 flex items-center justify-center flex-col gap-4  bg-[#2f60d1]">
              Deletar o usuário?
              <div className="p-4 bg-[#143789] w-full flex justify-between items-center rounded-lg    ">
                <div className="text-white  font-bold  text-lg">
                  <div>
                    <span className="text-slate-400  text-sm">Email:</span>{" "}
                    {user.email}
                  </div>
                  <div>
                    <span className="text-slate-400  text-sm">Username: </span>{" "}
                    {user.username}
                  </div>
                  <div className="w-full">
                    <span className="text-slate-400  text-sm">ID: </span>{" "}
                    {user.id}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-around">
                <button
                  onClick={() => {
                    deleteUser(user.id?.toString() || "");
                  }}
                  className="p-4 bg-green-600 rounded-lg transition-all hover:bg-green-400"
                >
                  SIM
                </button>
                <button
                  onClick={() => {
                    setIsDialogClientDataOpen(false);
                  }}
                  className="p-4 bg-red-600 hover:bg-red-400 rounded-lg transition-all"
                >
                  NÃO
                </button>
              </div>
            </div>

            <Dialog.Description />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="p-4 bg-[#2f60d1] w-full flex justify-between items-center rounded-lg    ">
        <div className="text-white  font-bold  text-lg">
          <div>
            <span className="text-slate-400  text-sm">Email:</span> {user.email}
          </div>
          <div>
            <span className="text-slate-400  text-sm">Username: </span>{" "}
            {user.username}
          </div>
          <div className="w-full">
            <span className="text-slate-400  text-sm">ID: </span> {user.id}
          </div>
        </div>
        <span title="Apagar usuário">
          <X
            className=" text-white transition-all hover:text-red-500 cursor-pointer right-4 top-4"
            onClick={() => {
              setIsDialogClientDataOpen(true);
            }}
            size={30}
          />
        </span>
      </div>
    </>
  );
}
