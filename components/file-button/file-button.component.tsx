import { FileButton as MFileButton } from "@mantine/core";
import { cloneElement, useEffect, useRef } from "react";

type FileButtonProps = {
  onSelect: (file: File | null) => void;
  accept?: string;
  children: any;
  watch: boolean;
}

export function FileButton({ watch , onSelect, accept = "image/png,image/jpeg,image/jpg,image/webp", children }: FileButtonProps) {
  const reference = useRef<() => void>(null);

  useEffect(() => {
    if (!watch) {
      reference.current?.();
    }
  }, [watch]);

  return (
    <MFileButton resetRef={reference} onChange={onSelect} accept={accept}>
      {(props) => cloneElement( children, {...children.props, ...props, onclick: props.onClick} )}
    </MFileButton>
  )
}