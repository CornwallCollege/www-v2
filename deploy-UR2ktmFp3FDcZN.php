<?php
/** 
  * This script is for easily deploying updates to Github repos to your local server. It will automatically git clone or 
  * git pull in your repo directory every time an update is pushed to your $BRANCH (configured below).
  * Read more about how to use this script at http://behindcompanies.com/2014/01/a-simple-script-for-deploying-code-with-githubs-webhooks/
  * 
  * INSTRUCTIONS:\
  * 1. Edit the variables below
  * 2. Upload this script to your server somewhere it can be publicly accessed
  * 3. Make sure the apache user owns this script (e.g., sudo chown www-data:www-data webhook.php)
  * 4. (optional) If the repo already exists on the server, make sure the same apache user from step 3 also owns that 
  *    directory (i.e., sudo chown -R www-data:www-data)
  * 5. Go into your Github Repo > Settings > Service Hooks > WebHook URLs and add the public URL 
  *    (e.g., http://example.com/webhook.php)
  *
 **/

// testing redeployment works
 
// Set Variables
$LOCAL_ROOT         = "/var/www/html/";
$LOCAL_REPO_NAME    = "m.cornwall.ac.uk";
$LOCAL_REPO         = "{$LOCAL_ROOT}/{$LOCAL_REPO_NAME}";
$REMOTE_REPO        = "https://github.com/CornwallCollege/www-v2.git";
$BRANCH             = "master";

if ($_SERVER['HTTP_X_GITHUB_EVENT'] == 'push') {
  // Only respond to requests from Github
  
  if( file_exists($LOCAL_REPO) ) {  
    // If there is already a repo, just run a git pull to grab the latest changes
	echo shell_exec("cd {$LOCAL_REPO} && git reset --hard origin/master");
    echo shell_exec("cd {$LOCAL_REPO} && git pull 2>&1 ");      

  } else {
    // If the repo does not exist, then clone it into the parent directory
    echo shell_exec("cd {$LOCAL_ROOT} && git clone {$REMOTE_REPO} 2>&1 && git submodule foreach git pull 2>&1");
  }
    
    echo shell_exec("jekyll build -V -s {$LOCAL_ROOT}/{$LOCAL_REPO_NAME} -d /var/www/html/m.cornwall.ac.uk/public 2>&1");
    die("done " . mktime());
}

?>