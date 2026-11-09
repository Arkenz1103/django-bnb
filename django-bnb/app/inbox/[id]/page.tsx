'use client';

import { getUserId } from "../../lib/actions";
import React, {useState, useEffect, use } from 'react';
import apiService from "@/app/services/apiService";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { UserType } from "../page";
import { getAccessToken } from "../../lib/actions";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType
}

const ConversationPage = ({ params }: { params: Promise<{id: string}> }) => {
    const unwrappedParams = use(params);
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [conversation, setConversation] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userIdValue = await getUserId();
                const tokenValue = await getAccessToken();

                if (!userIdValue || !tokenValue) {
                    setLoading(false);
                    return;
                }

                setUserId(userIdValue);
                setToken(tokenValue);

                const conversationData = await apiService.get(`/api/chat/${unwrappedParams.id}/`);
                setConversation(conversationData.conversation);
                setMessages(conversationData.messages);
            } catch (error) {
                console.error('Error fetching conversation:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [unwrappedParams.id]);

    if (loading) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <p>Loading...</p>
            </main>
        )
    }

    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail 
                token={token}
                userId={userId}
                conversation={conversation}
                messages={messages}
            />
        </main>
    )
}

export default ConversationPage;