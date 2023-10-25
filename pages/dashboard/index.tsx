import React from 'react';
import { showErrorToast } from '@/components/Toast';

type DashboardProps = {
    showError: boolean;
    errorMessage: string;
}

const Dashboard = (props: DashboardProps) => {
    if (props.showError) {
        showErrorToast(props.errorMessage);
    }

    return (
        <div>Dashboard</div>
    )
}

export async function getServerSideProps() {

}

export default Dashboard