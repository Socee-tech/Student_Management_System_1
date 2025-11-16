import { useSnackbar } from "notistack";

export default function UseNotify() {
    const { enqueueSnackbar } = useSnackbar();

    const notifySuccess = (msg) => enqueueSnackbar(msg, { variant: "success" });
    const notifyError = (msg) => enqueueSnackbar(msg, { variant: "error" });

    return { notifySuccess, notifyError };
}