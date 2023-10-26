import React from "react";
import { showErrorToast } from "@/components/Toast";
import Split from "react-split";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import FileSection from "@/components/FileExplorer/FileSection";
type DashboardProps = {
  showError: boolean;
  errorMessage: string;
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
export default Dashboard;
