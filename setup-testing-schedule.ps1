# Automated Testing Scheduler
# Creates Windows Task Scheduler entries for automated UX/UI testing

Write-Host "📅 Setting up Automated Testing Schedule..." -ForegroundColor Green

$websitePath = "d:\Github_personal\aymanaboghonim.github.io"

# Weekly Task (Sundays at 8 PM)
$weeklyAction = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-File `"$websitePath\enhanced-ux-testing.ps1`" weekly" -WorkingDirectory $websitePath

$weeklyTrigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At "20:00"

$weeklySettings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName "Website-Quality-Weekly" -Action $weeklyAction -Trigger $weeklyTrigger -Settings $weeklySettings -Description "Weekly comprehensive UX/UI quality testing for aymanaboghonim.github.io"

Write-Host "✅ Weekly task scheduled for Sundays at 8 PM" -ForegroundColor Green

# Monthly Task (First Sunday of month at 9 PM)
$monthlyAction = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-File `"$websitePath\enhanced-ux-testing.ps1`" monthly" -WorkingDirectory $websitePath

$monthlyTrigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -WeeksInterval 4 -At "21:00"

Register-ScheduledTask -TaskName "Website-Quality-Monthly" -Action $monthlyAction -Trigger $monthlyTrigger -Settings $weeklySettings -Description "Monthly deep UX/UI analysis for aymanaboghonim.github.io"

Write-Host "✅ Monthly task scheduled for first Sunday at 9 PM" -ForegroundColor Green

Write-Host "==================================" -ForegroundColor Yellow
Write-Host "📋 Scheduled Tasks Created:" -ForegroundColor Cyan
Write-Host "   📅 Weekly: Sundays at 8:00 PM" -ForegroundColor White
Write-Host "   📅 Monthly: First Sunday at 9:00 PM" -ForegroundColor White
Write-Host ""
Write-Host "🔧 To manage tasks:" -ForegroundColor Cyan
Write-Host "   View: Get-ScheduledTask -TaskName 'Website-Quality-*'" -ForegroundColor Gray
Write-Host "   Remove: Unregister-ScheduledTask -TaskName 'Website-Quality-Weekly'" -ForegroundColor Gray
Write-Host ""
Write-Host "📊 Manual testing commands:" -ForegroundColor Cyan
Write-Host "   Deployment: npm run test:deployment" -ForegroundColor Gray
Write-Host "   Weekly: npm run test:weekly" -ForegroundColor Gray
Write-Host "   Monthly: npm run test:monthly" -ForegroundColor Gray
