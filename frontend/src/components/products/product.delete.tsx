"use client";

import { useProducts } from "@/hooks/useProduct";
import Swal from "sweetalert2";

interface DeleteProps {
  productID: string;
  productName: string;
  closeModal: () => void;
}

function ProductDelete({ productID, closeModal, productName }: DeleteProps) {
  const { deleteError, deleteProduct, isDeleting } = useProducts();

  const handleDelete = () => {
    Swal.fire({
      title: "Eliminar producto",
      html: `¿Estás seguro de eliminar el producto <b>${productName}</b>?`,
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Si",
      confirmButtonColor: "var(--primary)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteProduct(productID);
        if (deleteError) {
          return Swal.fire({
            title: "Error",
            text: deleteError.error,
            icon: "error",
            confirmButtonColor: "var(--primary)",
          });
        }
        closeModal();
        return Swal.fire({
          title: "Eliminado",
          text: "El producto ha sido eliminado",
          icon: "success",
          confirmButtonColor: "var(--primary)",
        });
      }
    });
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="btn-sm w-full btn btn-ghost rounded-none flex items-center justify-between"
      >
        <span>Eliminar</span>
        <span className="icon-[prime--trash]" role="img" aria-hidden="true" />
      </button>
    </>
  );
}

export default ProductDelete;
