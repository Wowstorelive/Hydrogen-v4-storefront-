# Automatic Deployment Setup

This repository is configured to automatically deploy to Shopify Oxygen (Production) whenever code is pushed to the `main` branch.

## Initial Setup Required

### Step 1: Generate Shopify Hydrogen Deployment Token

1. Open your terminal and run:
   ```bash
   npx shopify hydrogen env token --env production
   ```

2. Copy the generated token (it starts with `shp_`)

### Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repository: https://github.com/Wowstorelive/Hydrogen-v4-storefront-
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN`
5. Value: Paste the token from Step 1
6. Click **Add secret**

### Step 3: Trigger First Deployment

Push any change to the `main` branch, or manually trigger the workflow:

1. Go to **Actions** tab in GitHub
2. Select **Deploy to Production** workflow
3. Click **Run workflow** → **Run workflow**

## How It Works

- **Automatic**: Every push to `main` triggers a deployment
- **Manual**: You can also trigger deployments from the Actions tab
- **Build First**: The workflow builds the project before deploying
- **Metadata**: Each deployment includes the Git commit SHA for tracking

## Monitoring Deployments

View deployment status:
- **GitHub**: Actions tab → Deploy to Production
- **Shopify**: Admin → Settings → Hydrogen → Deployments

## Troubleshooting

### Deployment fails with "No deployment token provided"
- Ensure `SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN` secret is set correctly in GitHub

### Deployment fails with authentication error
- Token may have expired - regenerate it using Step 1

### Want to deploy a different branch?
Edit `.github/workflows/deploy-production.yml` and change the `branches:` section.
