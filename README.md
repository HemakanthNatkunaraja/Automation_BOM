# Complete BOM Price Monitoring System Setup Guide

## What You'll Build
An automated system that tracks electronic component prices and availability from Digi-Key and Mouser, sends email alerts for price changes, and maintains a complete history of all updates - all using Google Sheets and free APIs.

## Prerequisites
- Google account
- Basic understanding of spreadsheets
- 30 minutes setup time
- Free API accounts (we'll set these up)

---

## Step 1: Create Your Google Sheet

### 1.1 Create New Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com/)
2. Click **"+ Blank"** to create new spreadsheet
3. Rename it to: **"BOM Price Monitor"**

### 1.2 Set Up Your Data Structure
Create these column headers in Row 1:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Part Number | Description | Supplier | Unit Price | Stock Quantity | Lead Time | Package | Datasheet URL | Last Updated | Notes |

### 1.3 Add Your Components
Starting from Row 2, add your electronic components:

**Example entries:**
```
STM32F103C8T6    ARM Microcontroller 32-bit    digikey    [leave empty]    [leave empty]    [leave empty]    LQFP-48    [leave empty]    [leave empty]    Critical for Project X
ESP32-WROOM-32   WiFi Bluetooth Module         mouser     [leave empty]    [leave empty]    [leave empty]    Module      [leave empty]    [leave empty]    Backup option available
LM7805CT         Voltage Regulator 5V          digikey    [leave empty]    [leave empty]    [leave empty]    TO-220      [leave empty]    [leave empty]    Standard power supply
```

**Important:** 
- Use exact manufacturer part numbers (not distributor part numbers)
- Supplier must be exactly "digikey" or "mouser" (lowercase)
- Leave Price, Stock, Lead Time, and Last Updated columns empty - these will auto-populate

---

## Step 2: Get Your API Credentials

### 2.1 Digi-Key API Setup
1. Visit [Digi-Key Developer Portal](https://developer.digikey.com/)
2. Click **"Get Started"** and create an account
3. Once logged in, click **"Create New App"**
4. Fill in application details:
   - **App Name:** BOM Price Monitor
   - **Description:** Personal component price monitoring
   - **Redirect URL:** https://localhost
   - **App Type:** Web Application
5. Click **"Create App"**
6. **SAVE THESE CREDENTIALS:**
   - Client ID (looks like: vKzIvhHyOX0J0119jxKzmRAQJAiqlaNbh2WcBTf3Yxsdkfny)
   - Client Secret (looks like: 05xYWhK03joB1Ohtv0uZpkDUZIGTDKdHQMwwn4xbyIosNfX9wkeab0H7yQvPkefE)

### 2.2 Mouser API Setup
1. Visit [Mouser Developer Portal](https://www.mouser.com/api-hub/)
2. Click **"Register"** and create an account
3. After email verification, log in to your dashboard
4. Click **"Generate API Key"**
5. **SAVE THIS CREDENTIAL:**
   - API Key (looks like: 1a735fca-f94f-4fa3-9992-cb4a2daf9733)

---

## Step 3: Install the Automation Code

### 3.1 Access Google Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete the default `myFunction()` code
3. Rename the project to: **"BOM Price Monitor"**

### 3.2 Add the Monitoring Code
1. Copy the complete code from your provided code file
2. Paste it into the Apps Script editor
3. **CRITICAL:** Update these sections with your API credentials:

```javascript
// Update this section with YOUR Digi-Key credentials
const DIGIKEY_CONFIG = {
  CLIENT_ID: 'YOUR_DIGIKEY_CLIENT_ID_HERE',
  CLIENT_SECRET: 'YOUR_DIGIKEY_CLIENT_SECRET_HERE',
  // ... rest remains the same
};

// Update this section with YOUR Mouser credentials
const MOUSER_CONFIG = {
  API_KEY: 'YOUR_MOUSER_API_KEY_HERE',
  // ... rest remains the same
};

// Update your email address
const CONFIG = {
  ALERT_EMAIL: 'your-email@gmail.com',
  // ... rest remains the same
};
```

### 3.3 Save and Set Permissions
1. Click **Save** (Ctrl+S)
2. Click **Run** → Select `initializeExistingSheet`
3. Click **Review permissions**
4. Choose your Google account
5. Click **Advanced** → **Go to BOM Price Monitor (unsafe)**
6. Click **Allow**

The system needs permissions for:
- Reading/writing to your Google Sheet
- Making external API calls
- Sending email notifications

---

## Step 4: Initialize and Test

### 4.1 Initialize the System
1. In Apps Script, select function: `initializeExistingSheet`
2. Click **Run** (play button)
3. Monitor the **Execution log** for progress
4. Wait for "System ready!" message

### 4.2 Test API Connections
Run these test functions one by one:

```javascript
// Test both APIs
testBothSuppliers()

// Test with your actual components
testYourActualData()

// Run first update
updateAllProducts()
```

### 4.3 Verify Setup Success
Check your Google Sheet - you should see:
- Your original components preserved
- New sheet created: "Change_Log"
- Price, Stock, and Lead Time columns starting to populate
- Last Updated column showing current timestamps

---

## Step 5: Configure Automatic Updates

### 5.1 Set Up Triggers
The system automatically creates hourly update triggers. To customize:

```javascript
// Change update frequency (in setupAutomaticUpdates function)
ScriptApp.newTrigger('updateAllProducts')
  .timeBased()
  .everyMinutes(30)  // Every 30 minutes instead of hourly
  .create();
```

### 5.2 Configure Alert Thresholds
Modify these settings in the CONFIG section:

```javascript
const CONFIG = {
  PRICE_CHANGE_THRESHOLD: 0.05,  // 5% price change triggers alert
  ALERT_EMAIL: 'your-email@gmail.com',
  // ... other settings
};
```

---

## Step 6: Add More Components

### Method 1: Direct Sheet Entry (Recommended)
1. Open your Google Sheet
2. Go to next empty row
3. Add: Part Number, Description, Supplier
4. Save the sheet
5. Run `updateAllProducts()` or wait for next automatic update

### Method 2: Bulk Addition via Script
```javascript
function addMyComponents() {
  const components = [
    ["ATMEGA328P-PU", "8-bit Microcontroller DIP", "digikey"],
    ["74HC595", "8-bit Shift Register", "digikey"],
    ["1N4007", "Rectifier Diode 1A 1000V", "mouser"],
    // Add your components here
  ];
  
  components.forEach(([partNumber, description, supplier]) => {
    addNewProduct(partNumber, description, supplier);
  });
  
  updateAllProducts();
}
```

---

## Step 7: Monitor and Maintain

### 7.1 Daily Monitoring
Check these regularly:
- **Products sheet:** Updated prices and stock levels
- **Change_Log sheet:** History of all changes
- **Email alerts:** Notifications for significant changes

### 7.2 System Health Checks
Run these functions monthly:

```javascript
// Check API usage
generateSummaryReport()

// Verify system status
testBothSuppliers()

// Reset rate limits if needed
resetRateLimits()
```

### 7.3 Troubleshooting Common Issues

**"Found 0 products to update"**
- Check that your sheet has the correct column headers
- Verify Part Number and Supplier columns have data
- Run `testYourActualData()` to debug

**"Token request failed"**
- Verify Digi-Key Client ID and Secret are correct
- Check for extra spaces or characters in credentials

**"Rate limit exceeded"**
- You've hit daily API limits (1K Digi-Key + 10K Mouser)
- Run `resetRateLimits()` or wait until next day

**Email notifications not working**
- Check email address in CONFIG section
- Verify Gmail permissions were granted
- Check spam folder

---

## Step 8: Advanced Features

### 8.1 Price Comparison Analysis
Add this function to compare suppliers:

```javascript
function comparePrices() {
  const sheet = getOrCreateSheet('Products');
  const products = getExistingProductData(sheet);
  
  // Group by part number
  const partGroups = {};
  products.forEach(product => {
    const partNum = product['Part Number'];
    if (!partGroups[partNum]) partGroups[partNum] = [];
    partGroups[partNum].push(product);
  });
  
  // Find parts with multiple suppliers
  Object.entries(partGroups).forEach(([partNum, suppliers]) => {
    if (suppliers.length > 1) {
      const prices = suppliers.map(s => ({ 
        supplier: s['Supplier'], 
        price: parseFloat(s['Unit Price'] || 0) 
      })).filter(s => s.price > 0);
      
      if (prices.length > 1) {
        const cheapest = prices.reduce((min, p) => p.price < min.price ? p : min);
        const expensive = prices.reduce((max, p) => p.price > max.price ? p : max);
        const savings = expensive.price - cheapest.price;
        const percent = ((savings / expensive.price) * 100).toFixed(1);
        
        console.log(`${partNum}: ${cheapest.supplier} is ${percent}% cheaper ($${savings.toFixed(3)} savings)`);
      }
    }
  });
}
```

### 8.2 Stock Alert System
Get notified when components go out of stock:

```javascript
function checkStockAlerts() {
  const sheet = getOrCreateSheet('Products');
  const products = getExistingProductData(sheet);
  
  const outOfStock = products.filter(p => 
    parseInt(p['Stock Quantity'] || 0) === 0 && p['Unit Price'] > 0
  );
  
  if (outOfStock.length > 0) {
    const subject = `STOCK ALERT: ${outOfStock.length} components out of stock`;
    let body = 'The following components are currently out of stock:\n\n';
    
    outOfStock.forEach(product => {
      body += `• ${product['Part Number']} (${product['Supplier']})\n`;
    });
    
    MailApp.sendEmail(CONFIG.ALERT_EMAIL, subject, body);
  }
}
```

### 8.3 Historical Price Tracking
Create price trend analysis:

```javascript
function generatePriceTrends() {
  const logSheet = getOrCreateSheet('Change_Log');
  const data = logSheet.getDataRange().getValues();
  
  // Filter price changes from last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const priceChanges = data.filter(row => {
    const timestamp = new Date(row[0]);
    return timestamp > thirtyDaysAgo && row[6] === 'price';
  });
  
  // Group by part number and show trends
  const trends = {};
  priceChanges.forEach(row => {
    const partNum = row[1];
    if (!trends[partNum]) trends[partNum] = [];
    trends[partNum].push({
      date: row[0],
      oldPrice: parseFloat(row[3]),
      newPrice: parseFloat(row[4]),
      change: parseFloat(row[5])
    });
  });
  
  // Log trending components
  Object.entries(trends).forEach(([partNum, changes]) => {
    if (changes.length > 1) {
      const totalChange = changes.reduce((sum, c) => sum + c.change, 0);
      console.log(`${partNum}: ${totalChange.toFixed(1)}% total change over 30 days`);
    }
  });
}
```

---

## Step 9: Best Practices

### 9.1 Component Selection
**High Priority Components:**
- Critical path items for active projects
- High-value components (>$10)
- Single-source or hard-to-find parts
- Components with known supply chain issues

**Medium Priority:**
- Standard logic ICs
- Common connectors
- Specialized passives

**Low Priority:**
- Commodity resistors/capacitors
- Very common components with many alternatives

### 9.2 Maintenance Schedule
**Daily:** Check email alerts, review significant changes
**Weekly:** Review Change_Log for patterns
**Monthly:** Run system health checks, verify API usage
**Quarterly:** Review and update component list

### 9.3 Data Quality
- Use exact manufacturer part numbers
- Keep descriptions consistent
- Regularly verify discontinued parts
- Monitor for pricing anomalies

---

## Step 10: Sharing and Collaboration

### 10.1 Share Your Sheet
1. Click **Share** button in Google Sheets
2. Add team members with appropriate permissions:
   - **Viewer:** Can see data only
   - **Editor:** Can modify component list
   - **Owner:** Full access to automation

### 10.2 Export Data
Create regular backups:
```javascript
function exportToCSV() {
  const sheet = getOrCreateSheet('Products');
  const data = sheet.getDataRange().getValues();
  
  // Convert to CSV format
  const csv = data.map(row => row.join(',')).join('\n');
  
  // Save to Google Drive
  const blob = Utilities.newBlob(csv, 'text/csv', 'BOM_Export_' + new Date().toISOString().split('T')[0] + '.csv');
  DriveApp.createFile(blob);
}
```

---

## Troubleshooting Quick Reference

| Problem | Solution |
|---------|----------|
| No price updates | Check API credentials, verify part numbers exist in supplier database |
| Email alerts not working | Verify email address in CONFIG, check Gmail permissions |
| Rate limit errors | Use `resetRateLimits()` or reduce update frequency |
| Components not found | Try alternative part numbers, check both suppliers |
| Execution timeouts | Reduce batch size, add more `Utilities.sleep()` calls |

---

## Support and Resources

### API Documentation
- [Digi-Key API Docs](https://developer.digikey.com/products/product-information/productinformation)
- [Mouser API Docs](https://www.mouser.com/api-hub/)

### Google Apps Script Help
- [Apps Script Documentation](https://developers.google.com/apps-script)
- [UrlFetchApp Reference](https://developers.google.com/apps-script/reference/url-fetch)

### Component Databases
- [Octopart](https://octopart.com/) - Cross-reference part numbers
- [Findchips](https://www.findchips.com/) - Alternative sourcing

This system provides real-time visibility into your component costs and availability, helping you make better procurement decisions and catch supply chain issues early. The automated alerts ensure you never miss important price changes or stock shortages.
