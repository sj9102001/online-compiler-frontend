import React from "react";
import { showErrorToast } from "@/components/Toast";
import Split from "react-split";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import FileSection from "@/components/FileExplorer/FileSection";

type DashboardProps = {
  user: {
    username: string;
    email: string;
    userId: string;
  } | null;
};

const Dashboard = (props: DashboardProps) => {
  return (
    <Split
      className="split h-[calc(100vh-88px)]"
      minSize={0}
      snapOffset={175}
      sizes={[15, 85]}
    >
      <div className="bg-[rgb(29,28,28)] text-[#fff] rounded-tr-lg">
        <FileSection />
      </div>
      <div className="bg-[rgb(29,28,28)] rounded-tl-lg ">
        <CodeEditor />
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

  return {
    props: {
      user: null,
    },
  };
}

export default Dashboard;
