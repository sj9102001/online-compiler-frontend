import React, { useState } from "react";
import { showErrorToast } from "@/components/Toast";
import Split from "react-split";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import FileSection from "@/components/FileExplorer/FileSection";
import NotSelected from "@/components/CodeEditor/NotSelected";

type File = {
  filename: string;
  runtime: string;
  fileId: string;
};

type SelectedFile = {
  filename: string;
  runtime: string;
  fileId: string;
  content: string;
};

type DashboardProps = {
  user: {
    username: string;
    email: string;
    userId: string;
  };
  files: File[];
};

const Dashboard = (props: DashboardProps) => {
  const [files, setFiles] = useState<
    { filename: string; runtime: string; fileId: string }[]
  >(props.files);
  const addFile = (fileName: string, fileType: string, fileId: string) => {
    setFiles([
      ...files,
      { filename: fileName, runtime: fileType, fileId: fileId },
    ]);
  };
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);

  const selectFileHandler = async (codeId: string) => {
    try {
      const selectFileResponse = await fetch(
        `http://localhost:8080/file/code/${codeId}`
      );
      const selectFileData = await selectFileResponse.json();
      setSelectedFile({
        fileId: selectFileData.id,
        filename: selectFileData.filename,
        runtime: selectFileData.runtime,
        content: selectFileData.content,
      });
      console.log(selectFileData);
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };

  const clearSelectedFileHandler = () => {
    setSelectedFile(null);
  };

  const deleteFile = async (fileId: string) => {
    try {
      const deleteResponse = await fetch(
        `http://localhost:8080/file/code/${fileId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: props.user.userId,
          }),
        }
      );
      if (!deleteResponse.ok) {
        throw new Error("Failed to delete file");
      }

      setFiles(files.filter((file) => file.fileId !== fileId));
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };
  return (
    <Split
      className="split h-[calc(100vh-88px)]"
      minSize={0}
      snapOffset={175}
      sizes={[15, 85]}
    >
      <div className="bg-[rgb(29,28,28)] text-[#fff] rounded-tr-lg">
        <FileSection
          selectFile={selectFileHandler}
          files={files}
          setFiles={setFiles}
          addFile={addFile}
          deleteFile={deleteFile}
          user={props.user}
        />
      </div>
      <div className="bg-[rgb(29,28,28)] rounded-tl-lg overflow-hidden">
        {selectedFile === null ? (
          <NotSelected />
        ) : (
          <CodeEditor
            clearSelectedFile={clearSelectedFileHandler}
            file={selectedFile}
          />
        )}
      </div>
    </Split>
  );
};

export async function getServerSideProps(context: any) {
  const req = context.req;
  const cookieHeader = req.headers.cookie;
  const authResponse = await fetch("http://localhost:8080/user/verifyAuth", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (authResponse.status === 401) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const authData = await authResponse.json();

  const filesResponse = await fetch("http://localhost:8080/file", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  const filesData = await filesResponse.json();
  return {
    props: {
      user: {
        username: authData.user.username,
        email: authData.user.email,
        userId: authData.user.userId,
      },
      files: filesData.files,
    },
  };
}

export default Dashboard;
