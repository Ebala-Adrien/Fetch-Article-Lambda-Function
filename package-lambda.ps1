# PowerShell script to package Lambda function with all dependencies

Write-Host "📦 Packaging Lambda function..." -ForegroundColor Cyan

# Clean previous build
if (Test-Path "lambda-deployment.zip") {
    Remove-Item "lambda-deployment.zip"
}

# Install production dependencies
Write-Host "📥 Installing dependencies..." -ForegroundColor Yellow
npm install --production

# Create deployment package using PowerShell
Write-Host "📦 Creating zip file..." -ForegroundColor Yellow
Compress-Archive -Path .\* -DestinationPath lambda-deployment.zip -Force

Write-Host "✅ Deployment package created: lambda-deployment.zip" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Upload this file to your Lambda function in AWS Console" -ForegroundColor Cyan
Write-Host "   Or use: aws lambda update-function-code --function-name YOUR_FUNCTION_NAME --zip-file fileb://lambda-deployment.zip" -ForegroundColor Cyan

