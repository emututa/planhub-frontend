(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "client",
    ()=>client
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5000") || 'http://localhost:5000';
class ApiClient {
    client;
    constructor(){
        this.client = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: `${API_BASE_URL}/api`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Request interceptor - add token
        this.client.interceptors.request.use((config)=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        }, (error)=>Promise.reject(error));
        // Response interceptor - handle errors
        this.client.interceptors.response.use((response)=>response, (error)=>{
            if (error.response?.status === 401) {
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        });
    }
    // GET request
    async get(url) {
        const response = await this.client.get(url);
        return response.data;
    }
    // POST request
    async post(url, data) {
        const response = await this.client.post(url, data);
        return response.data;
    }
    // PUT request
    async put(url, data) {
        const response = await this.client.put(url, data);
        return response.data;
    }
    // DELETE request
    async delete(url) {
        const response = await this.client.delete(url);
        return response.data;
    }
}
const client = new ApiClient();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/authApi.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "userRoutes",
    ()=>userRoutes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/index.ts [app-client] (ecmascript)");
;
const userRoutes = {
    // POST /api/users/register
    register: async (data)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].post('/users/register', data);
    },
    // POST /api/users/login
    login: async (data)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].post('/users/login', data);
    },
    // GET /api/users
    getAllUsers: async ()=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].get('/users');
    },
    // GET /api/users/:id
    getUserById: async (id)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].get(`/users/${id}`);
    },
    // PUT /api/users/:id
    updateUser: async (id, data)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].put(`/users/${id}`, data);
    },
    // DELETE /api/users/:id
    deleteUser: async (id)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].delete(`/users/${id}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/context/userStore.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserStoreProvider",
    ()=>UserStoreProvider,
    "useUserStore",
    ()=>useUserStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$authApi$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/authApi.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const UserStoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const UserStoreProvider = ({ children })=>{
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Initialize from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserStoreProvider.useEffect": ()=>{
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (storedToken && storedUser) {
                try {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                } catch (err) {
                    console.error('Failed to parse stored user:', err);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setIsLoading(false);
        }
    }["UserStoreProvider.useEffect"], []);
    // Register
    const register = async (data)=>{
        setIsLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$authApi$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userRoutes"].register(data);
            setUser(response.user);
            setToken(response.token);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Registration failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    // Login
    const login = async (data)=>{
        setIsLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$authApi$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userRoutes"].login(data);
            setUser(response.user);
            setToken(response.token);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Login failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    // Logout
    const logout = ()=>{
        setUser(null);
        setToken(null);
        setError(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };
    // Update user
    const updateUser = async (id, data)=>{
        setIsLoading(true);
        setError(null);
        try {
            const updatedUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$authApi$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userRoutes"].updateUser(id, data);
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Update failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    // Clear error
    const clearError = ()=>{
        setError(null);
    };
    const value = {
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        error,
        register,
        login,
        logout,
        updateUser,
        clearError
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UserStoreContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/context/userStore.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(UserStoreProvider, "mzZbxlz3rJTcku+Jn+vbpbhpSMU=");
_c = UserStoreProvider;
const useUserStore = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(UserStoreContext);
    if (!context) {
        throw new Error('useUserStore must be used within UserStoreProvider');
    }
    return context;
};
_s1(useUserStore, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "UserStoreProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/adminApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminRoutes",
    ()=>adminRoutes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/index.ts [app-client] (ecmascript)");
;
const adminRoutes = {
    // POST /api/admin/init-first (Initialize first admin)
    initFirstAdmin: async (data)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].post('/admin/init-first', data);
    },
    // POST /api/admin/login
    login: async (data)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].post('/admin/login', data);
    },
    // POST /api/admin/create (Admin creates another admin)
    createAdmin: async (data)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].post('/admin/create', data);
    },
    // GET /api/admin
    getAllAdmins: async ()=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].get('/admin');
    },
    // DELETE /api/admin/:id
    deleteAdmin: async (id)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].delete(`/admin/${id}`);
    },
    // GET /api/admin/registrations/pending
    getPendingRegistrations: async ()=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].get('/admin/registrations/pending');
    },
    // GET /api/admin/registrations/approved
    getApprovedRegistrations: async ()=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].get('/admin/registrations/approved');
    },
    // POST /api/admin/registrations/:id/approve
    approveRegistration: async (id)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].post(`/admin/registrations/${id}/approve`);
    },
    // POST /api/admin/registrations/:id/reject
    rejectRegistration: async (id)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].post(`/admin/registrations/${id}/reject`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/context/adminStore.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminStoreProvider",
    ()=>AdminStoreProvider,
    "useAdminStore",
    ()=>useAdminStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$adminApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/adminApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AdminStoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AdminStoreProvider = ({ children })=>{
    _s();
    const [admin, setAdmin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminStoreProvider.useEffect": ()=>{
            const storedToken = localStorage.getItem('admin_token');
            const storedAdmin = localStorage.getItem('admin_user');
            if (storedToken && storedAdmin) {
                try {
                    setToken(storedToken);
                    setAdmin(JSON.parse(storedAdmin));
                } catch (err) {
                    console.error('Failed to parse stored admin:', err);
                    localStorage.removeItem('admin_token');
                    localStorage.removeItem('admin_user');
                }
            }
            setIsLoading(false);
        }
    }["AdminStoreProvider.useEffect"], []);
    const initFirstAdmin = async (data)=>{
        setIsLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$adminApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adminRoutes"].initFirstAdmin(data);
            setAdmin(response.admin);
            setToken(response.token);
            localStorage.setItem('admin_token', response.token);
            localStorage.setItem('admin_user', JSON.stringify(response.admin));
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Initialization failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    const login = async (data)=>{
        setIsLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$adminApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adminRoutes"].login(data);
            setAdmin(response.admin);
            setToken(response.token);
            localStorage.setItem('admin_token', response.token);
            localStorage.setItem('admin_user', JSON.stringify(response.admin));
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Login failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    const logout = ()=>{
        setAdmin(null);
        setToken(null);
        setError(null);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    };
    const clearError = ()=>{
        setError(null);
    };
    const value = {
        admin,
        token,
        isAuthenticated: !!token && !!admin,
        isLoading,
        error,
        initFirstAdmin,
        login,
        logout,
        clearError
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminStoreContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/context/adminStore.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AdminStoreProvider, "eq/kgtYlbqBY89PJ7sYH1zy4a5Y=");
_c = AdminStoreProvider;
const useAdminStore = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AdminStoreContext);
    if (!context) {
        throw new Error('useAdminStore must be used within AdminStoreProvider');
    }
    return context;
};
_s1(useAdminStore, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AdminStoreProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_56ac2564._.js.map