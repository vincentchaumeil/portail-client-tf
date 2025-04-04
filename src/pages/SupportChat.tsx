
import React, { useState } from 'react';
import AppTopbar from '@/components/layout/AppTopbar';
import ChatList from '@/components/chat/ChatList';
import ChatWindow from '@/components/chat/ChatWindow';
import AppLayout from '@/components/layout/AppLayout';
import { mockContacts, mockConversations } from '@/data/mockChats';
import { motion } from 'framer-motion';

const SupportChat = () => {
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
    <AppLayout>
      <AppTopbar title="Support Chat" />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Contact List - hidden on mobile when chat is active */}
        <motion.div 
          className={`bg-white shadow-sm z-10 ${showMobileChat ? 'hidden md:block' : 'block'} w-full md:w-80 xl:w-96 border-r border-gray-200`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ChatList 
            contacts={mockContacts} 
            activeContactId={activeContactId || undefined}
            onSelectContact={handleSelectContact} 
          />
        </motion.div>
        
        {/* Chat Window - shown only when a contact is selected */}
        <motion.div 
          className={`flex-1 ${!showMobileChat && !activeContactId ? 'hidden md:flex' : 'flex'} flex-col bg-white`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {activeContactId ? (
            <ChatWindow 
              conversation={mockConversations[activeContactId]} 
              onBack={handleBackToList}
            />
          ) : (
            <div className="flex items-center justify-center h-full flex-col p-6 text-center">
              <motion.div 
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-lg font-medium mb-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                No conversation selected
              </motion.h3>
              <motion.p 
                className="text-gray-500 max-w-md"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                Select a contact from the list to start chatting or get help with your orders.
              </motion.p>
            </div>
          )}
        </motion.div>
      </main>
    </AppLayout>
  );
};

export default SupportChat;
