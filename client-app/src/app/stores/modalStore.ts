import { makeAutoObservable } from "mobx";

interface Modal {
  open: boolean;
  body: JSX.Element | null;
  header: string;
}

export default class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
    header: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (content: JSX.Element, header: string = "") => {
    this.modal.open = true;
    this.modal.body = content;
    this.modal.header = header;
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
    this.modal.header = "";
  };
}
