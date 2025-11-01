#!/bin/bash
# Script to package Lambda function with all dependencies

echo "📦 Packaging Lambda function..."

# Clean previous build
rm -f lambda-deployment.zip

# Install production dependencies
echo "📥 Installing dependencies..."
npm install --production

# Create deployment package
echo "📦 Creating zip file..."
zip -r lambda-deployment.zip . \
  -x "*.git*" \
  -x "*.env*" \
  -x "*.DS_Store" \
  -x "node_modules/.cache/*" \
  -x "*.log" \
  -x ".gitignore" \
  -x "package-lambda.sh" \
  -x "verify-deployment.js"

echo "✅ Deployment package created: lambda-deployment.zip"
echo ""
echo "📝 Upload this file to your Lambda function in AWS Console"
echo "   Or use: aws lambda update-function-code --function-name YOUR_FUNCTION_NAME --zip-file fileb://lambda-deployment.zip"

