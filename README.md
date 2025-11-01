# Fetch Article News

A serverless application that scrapes news articles from multiple sources and saves them to a MongoDB database.

## Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- AWS Account with Lambda access
- MongoDB database (local or cloud)

### Installation

1. **Clone or download this repository**

   ```bash
   git clone <repository-url>
   cd Fetch-Article-News
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file (for local development)**

   Create a `.env` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

## Lambda Deployment

### Step 1: Download/Clone this folder

### Step 2: Install dependencies

```bash
npm install
```

This will install all required packages including `mongoose`, `cheerio`, and their dependencies into the `node_modules` folder.

### Step 3: Create deployment package

Run the zip command inside the project folder to create the deployment package:

```bash
zip -r my_deployment_package.zip . \
  -x "*.git*" \
  -x ".env*" \
  -x ".gitignore" \
  -x ".DS_Store" \
  -x "*.log" \
  -x "node_modules/.cache/*"
```

This will create `my_deployment_package.zip`.

**Important:** The zip file must include:
- ✅ All your source code (`index.js`, `functions/`, `database/`, etc.)
- ✅ `package.json` with `"type": "module"`
- ✅ `node_modules/` folder (contains mongoose and all dependencies)

### Step 4: Upload to Lambda

1. Go to AWS Lambda Console
2. Select your Lambda function (or create a new one)
3. Go to **Code** tab
4. Click **Upload from** → **.zip file**
5. Select your `my_deployment_package.zip` file
6. Click **Save**

### Step 5: Configure Lambda

1. **Handler:** Set to `index.handler`
2. **Runtime:** Node.js 20.x or Node.js 18.x
3. **Environment Variables:** Add `MONGODB_URI` with your MongoDB connection string
   - Key: `MONGODB_URI`
   - Value: Your MongoDB connection string

4. **Timeout:** Set an appropriate timeout (e.g., 30 seconds or more depending on your needs)
5. **Memory:** Adjust as needed (128 MB minimum, may need more for large scrapes)

### Step 6: Test

You can test your Lambda function by creating a test event:

```json
{
  "sources": ["all"],
  "languages": ["en", "sp", "pt"],
  "categories": ["all"]
}
```
