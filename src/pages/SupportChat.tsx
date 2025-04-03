
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTopbar from '@/components/layout/AppTopbar';
import ChatList from '@/components/chat/ChatList';
import ChatWindow from '@/components/chat/ChatWindow';
import { mockContacts, mockConversations } from '@/data/mockChats';

const SupportChat = () => {
  const navigate = useNavigate();
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const handleSelectContact = (contactId: string) => {
    setActiveContactId(contactId);
    setShowMobileChat(true);
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  return (
    <div className="flex h-screen bg-gray-50/70 backdrop-blur-sm overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppTopbar title="Support Chat" />
        
        <main className="flex-1 flex overflow-hidden">
          {/* Contact List - hidden on mobile when chat is active */}
          <div className={`bg-white shadow-sm z-10 ${showMobileChat ? 'hidden md:block' : 'block'} w-full md:w-80 xl:w-96 border-r border-gray-200`}>
            <ChatList 
              contacts={mockContacts} 
              activeContactId={activeContactId || undefined}
              onSelectContact={handleSelectContact} 
            />
          </div>
          
          {/* Chat Window - shown only when a contact is selected */}
          <div className={`flex-1 ${!showMobileChat && !activeContactId ? 'hidden md:flex' : 'flex'} flex-col bg-white`}>
            {activeContactId ? (
              <ChatWindow 
                conversation={mockConversations[activeContactId]} 
                onBack={handleBackToList}
              />
            ) : (
              <div className="flex items-center justify-center h-full flex-col p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p className="text-gray-500 max-w-md">
                  Select a contact from the list to start chatting or get help with your orders.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupportChat;
