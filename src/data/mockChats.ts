
import { ChatConversation } from "@/components/chat/ChatWindow";
import { ChatContact } from "@/components/chat/ChatList";

export const mockContacts: ChatContact[] = [
  {
    id: "1",
    name: "Cédric Denonfoux",
    lastMessage: "Could you check the latest delivery status?",
    time: "10:42",
    unread: 2,
    status: "online"
  },
  {
    id: "2",
    name: "Anthony Fernandes",
    lastMessage: "I'll send you the updated tracking information.",
    time: "Yesterday",
    unread: 0,
    status: "away"
  },
  {
    id: "3",
    name: "Sophie Mercier",
    lastMessage: "The shipment has been dispatched from our warehouse.",
    time: "Monday",
    unread: 0,
    status: "offline"
  },
  {
    id: "4",
    name: "Jean Dupont",
    lastMessage: "Please confirm the delivery address for order #TF-7845.",
    time: "23/03",
    unread: 0,
    status: "offline"
  },
  {
    id: "5",
    name: "Marie Lambert",
    lastMessage: "Thanks for your quick response!",
    time: "21/03",
    unread: 0,
    status: "offline"
  }
];

export const mockConversations: Record<string, ChatConversation> = {
  "1": {
    id: "1",
    contactName: "Cédric Denonfoux",
    status: "online",
    messages: [
      {
        content: "Bonjour! I have a question about my order #TF-9283",
        timestamp: "10:27",
        isOutgoing: false
      },
      {
        content: "Of course, let me check that order for you. One moment please.",
        timestamp: "10:29",
        isOutgoing: true
      },
      {
        content: "I see your order was shipped yesterday. Is there a specific question about it?",
        timestamp: "10:30",
        isOutgoing: true
      },
      {
        content: "Yes, I was expecting delivery today but haven't received any update.",
        timestamp: "10:35",
        isOutgoing: false
      },
      {
        content: "Could you check the latest delivery status?",
        timestamp: "10:42",
        isOutgoing: false
      }
    ]
  },
  "2": {
    id: "2",
    contactName: "Anthony Fernandes",
    status: "away",
    messages: [
      {
        content: "Hello, I wanted to follow up on my previous request about order #TF-8541",
        timestamp: "Yesterday, 14:15",
        isOutgoing: false
      },
      {
        content: "Hi Anthony, I remember your case. The shipment was delayed due to weather conditions.",
        timestamp: "Yesterday, 14:20",
        isOutgoing: true
      },
      {
        content: "Do you have any update on when it will arrive?",
        timestamp: "Yesterday, 14:25",
        isOutgoing: false
      },
      {
        content: "The carrier just informed us that delivery is now scheduled for tomorrow.",
        timestamp: "Yesterday, 14:30",
        isOutgoing: true
      },
      {
        content: "I'll send you the updated tracking information.",
        timestamp: "Yesterday, 14:32",
        isOutgoing: false
      }
    ]
  }
};
