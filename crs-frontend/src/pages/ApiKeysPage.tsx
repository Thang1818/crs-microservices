import { useEffect, useState } from 'react';
import axios from 'axios';

import {
    getApiKeys,
    createApiKey,
    revokeApiKey
} from '../api/apiKeyApi';

import type {
    ApiKey
} from '../types/apiKey';

export default function ApiKeysPage() {

    const [apiKeys, setApiKeys] =
        useState<ApiKey[]>([]);

    const [ownerName, setOwnerName] =
        useState('');

    const [scopes, setScopes] =
        useState('courses:read');

    const [validDays, setValidDays] =
        useState(30);

    const [newKey, setNewKey] =
        useState('');

    const [error, setError] =
        useState('');

    const loadApiKeys = async () => {

        try {

            const res = await getApiKeys();

            setApiKeys(res.data);

        } catch (err) {

            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                    'Khong the tai danh sach API Key'
                );
            }
        }
    };

    useEffect(() => {
        loadApiKeys();
    }, []);

    const handleCreate = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            const res = await createApiKey({
                ownerName,
                scopes,
                validDays
            });

            setNewKey(
                res.data.keyValue
            );

            setOwnerName('');

            await loadApiKeys();

        } catch (err) {

            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                    'Tao API Key that bai'
                );
            }
        }
    };

    const handleRevoke = async (
        id: number
    ) => {

        if (
            !window.confirm(
                'Ban co chac muon thu hoi API Key nay?'
            )
        ) {
            return;
        }

        try {

            await revokeApiKey(id);

            await loadApiKeys();

        } catch {
            setError(
                'Thu hoi API Key that bai'
            );
        }
    };

    return (
        <div style={{
            padding: '30px'
        }}>

            <h1>
                Quan ly API Key
            </h1>

            {error && (
                <div>
                    {error}
                </div>
            )}

            {newKey && (
                <div>

                    <strong>
                        API Key moi:
                    </strong>

                    <p>
                        {newKey}
                    </p>

                    <small>
                        Hay luu key nay.
                        Key chi hien thi sau khi tao.
                    </small>

                    <button
                        onClick={() =>
                            setNewKey('')
                        }
                    >
                        Da luu
                    </button>

                </div>
            )}

            <form
                onSubmit={handleCreate}
            >

                <div>
                    <label>
                        Ten doi tac
                    </label>

                    <input
                        value={ownerName}
                        onChange={e =>
                            setOwnerName(
                                e.target.value
                            )
                        }
                        required
                    />
                </div>

                <div>
                    <label>
                        Scope
                    </label>

                    <input
                        value={scopes}
                        onChange={e =>
                            setScopes(
                                e.target.value
                            )
                        }
                        required
                    />
                </div>

                <div>
                    <label>
                        So ngay hieu luc
                    </label>

                    <input
                        type="number"
                        min="1"
                        value={validDays}
                        onChange={e =>
                            setValidDays(
                                Number(e.target.value)
                            )
                        }
                    />
                </div>

                <button type="submit">
                    Tao API Key
                </button>

            </form>

            <hr />

            <h2>
                Danh sach API Key
            </h2>

            <table>

                <thead>
                <tr>
                    <th>ID</th>
                    <th>Doi tac</th>
                    <th>Scope</th>
                    <th>Status</th>
                    <th>Het han</th>
                    <th>Thao tac</th>
                </tr>
                </thead>

                <tbody>

                {apiKeys.map(apiKey => (

                    <tr key={apiKey.id}>

                        <td>
                            {apiKey.id}
                        </td>

                        <td>
                            {apiKey.ownerName}
                        </td>

                        <td>
                            {apiKey.scopes}
                        </td>

                        <td>
                            {apiKey.status}
                        </td>

                        <td>
                            {apiKey.expiresAt || 'Khong het han'}
                        </td>

                        <td>

                            {apiKey.status ===
                                'ACTIVE' && (

                                    <button
                                        onClick={() =>
                                            handleRevoke(
                                                apiKey.id
                                            )
                                        }
                                    >
                                        Thu hoi
                                    </button>
                                )}

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}