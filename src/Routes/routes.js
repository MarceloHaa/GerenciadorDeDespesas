import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Login from '../Pages/Login/index';
import Home from '../Pages/Home/index';
import ExpenseManager from '../Pages/ExpenseManager';
import ExpenseTypeManager from '../Pages/ExpenseTypeManager';
import CreateExpenseType from '../Pages/ExpenseTypeManager/CreateExpenseType';
import EditExpenseType from '../Pages/ExpenseTypeManager/EditExpenseType';
import CreateExpense from '../Pages/ExpenseManager/CreateExpense';
import EditExpense from '../Pages/ExpenseManager/EditExpense';
import ProtectedRoutes from './ProtectedRoutes';
import Register from '../Pages/Register';
import Navbar from '../Components/NavBar';
import UserList from '../Pages/UserList';
import WelcomePage from '../Pages/Welcome/index';
import { ThemeProvider } from './../Contexts/ThemeContext';

const Layout = ({ children }) => (
    <>
        <Navbar />
        {children}
    </>
);

const Routering = () => {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastrar" element={<Register />} />
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoutes>
                                <Layout>
                                    <Home />
                                </Layout>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/despesas"
                        element={
                            <ProtectedRoutes>
                                <Layout>
                                    <ExpenseManager />
                                </Layout>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/despesas/criar"
                        element={
                            <ProtectedRoutes>
                                <Layout>
                                    <CreateExpense />
                                </Layout>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/despesas/editar/:id"
                        element={
                            <ProtectedRoutes>
                                <Layout>
                                    <EditExpense />
                                </Layout>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/tipos-de-despesas"
                        element={
                            <ProtectedRoutes requireAdmin={true}>
                                <Layout>
                                    <ExpenseTypeManager />
                                </Layout>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/tipos-de-despesas/criar"
                        element={
                            <ProtectedRoutes requireAdmin={true}>
                                <Layout>
                                    <CreateExpenseType />
                                </Layout>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/tipos-de-despesas/editar/:id"
                        element={
                            <ProtectedRoutes requireAdmin={true}>
                                <Layout>
                                    <EditExpenseType />
                                </Layout>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/usuarios"
                        element={
                            <ProtectedRoutes requireAdmin={true}>
                                <Layout>
                                    <UserList />
                                </Layout>
                            </ProtectedRoutes>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default Routering;
