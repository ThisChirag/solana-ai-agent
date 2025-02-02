# Solana PG Assistant 🚀

An AI-powered assistant for Solana development, integrated with Solana Playground.

## 🌟 Features

- **Smart Contract Generation**: Transform ideas into production-ready Rust code.
- **Playground Expert**: Get guidance on Solana Playground features.
- **Interactive Learning**: Master Solana concepts through natural dialogue.
- **Code Companion**: Instant help with code reviews and debugging.
- **Quick Answers**: Context-aware responses about Solana development.
- **Development Guide**: AI-powered recommendations for best practices.

## ⚒️ Tech Stack

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript + FastAPI
- **Database**: PostgreSQL with Prisma ORM
- **AI**: LangChain + OpenAI
- **Vector Store**: Qdrant


## 🚀 Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/ThisChirag/solana-ai-agent
cd solana-pg-assistant
```

### 2. Environment Setup
Create `.env` files:

#### `api/.env`
```sh
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="your-key"
QDRANT_URL="http://localhost:6333"
GITHUB_CLIENT_ID="your-id"
GITHUB_CLIENT_SECRET="your-secret"
```

#### `frontend/.env`
```sh
VITE_BACKEND_URL="http://localhost:3000"
```

### 3. Install Dependencies
```sh
# Install API dependencies
cd api
pnpm install

# Install Frontend dependencies
cd ../frontend
pnpm install

# Install Embeddings Generator dependencies
cd ../embeddings-generator
pnpm install
```

### 4. Database Setup
```sh
cd api
npx prisma migrate dev
```

### 5. Generate Embeddings
```sh
cd embeddings-generator
pnpm tsc
node dist/index.js
```

### 6. Start Development Servers
```sh
# Start API server
cd api
pnpm dev

# Start Frontend
cd frontend
pnpm dev
```

## 🌍 Deployed Version
[Live Demo](https://pg.chiragcodes.com)

## 🛠️ Project Structure
```
api/                    # Backend API
  ├── src/
      ├── controllers/  # Request handlers
      ├── services/     # Business logic
      ├── utils/        # Helper functions
frontend/               # React frontend
  ├── src/
      ├── components/   # UI components
      ├── routes/       # Page routes
embeddings-generator/   # Knowledge base processor
```

## 💡 Key Features Implementation

1. **Chat Interface**: Implements real-time conversation with code highlighting.
2. **Vector Search**: Uses Qdrant for semantic search of Solana documentation.
3. **Smart Contract Generation**: AI-powered code generation with context.
4. **History Tracking**: Maintains chat history in PostgreSQL.

## 🔒 Security
- GitHub OAuth for authentication (will add gradually)
- Environment variable protection
- Input sanitization
- Rate limiting (in progress)

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 License
This project is licensed under the MIT License - see the LICENSE file for details.


## 🔗 Links
- [Solana Playground](https://beta.solpg.io/)
- [Documentation](https://github.com/ThisChirag/solana-ai-agent)




