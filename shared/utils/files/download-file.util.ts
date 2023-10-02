type FileDownloaderProps = {
  uri: string;
  filename: string;
  onSuccess: () => void;
  onError: () => void;
}

export const FileDownloader = async ({ uri, filename, onSuccess, onError }: FileDownloaderProps) => {
  return fetch(uri)
    .then(async (response) => {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${filename}.png`;
      downloadLink.click();
      onSuccess();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('FileDownloader: ', error);
      onError();
    })
};