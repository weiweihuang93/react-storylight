import Swal from "sweetalert2";

export const swalConfirm = async (title) => {
  const result = await Swal.fire({
    title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "刪除",
    cancelButtonText: "取消",
  });
  return result.isConfirmed;
};
