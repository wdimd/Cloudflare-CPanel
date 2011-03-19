var OPEN_HELP=-1,VALID=[],CF_RECS={},NUM_RECS=0,REC_TEXT=[],WWW_DOM_INFO=[],CF_LANG={creating_account:"Creating Your CloudFlare Account. This may take several minutes.",signup_welcome:"Welcome to CloudFlare",signup_info:'Generate a CloudFlare password <a href="https://www.cloudflare.com/forgot-password.html" target="_blank">here</a>. Your CloudFlare email is curently set to {email}. Click <a href="">here</a> to continue.',tooltip_zone_cf_off:"CloudFlare is currently off. Click to enable",tooltip_zone_cf_on:"CloudFlare is currently on. Click to disable"},
get_lang_string=function(b,d){var a=CF_LANG[b];d=d||{};if(a)try{return YAHOO.lang.substitute(a,d)}catch(c){}return""},signup_to_cf=function(){var b,d,a;if(!YAHOO.util.Dom.get("USER_tos").checked){CPANEL.widgets.status_bar("add_USER_status_bar","error",CPANEL.lang.Error,"Please agree to the Terms of Service before continuing.");return false}var c=YAHOO.util.Dom.get("USER_email").value;a={cpanel_jsonapi_version:2,cpanel_jsonapi_module:"CloudFlare",cpanel_jsonapi_func:"user_create",user:YAHOO.util.Dom.get("USER_user").value,
email:c,homedir:USER_HOME_DIR};YAHOO.util.Connect.asyncRequest("GET",CPANEL.urls.json_api(a),{success:function(f){try{var g=YAHOO.lang.JSON.parse(f.responseText);if(g.cpanelresult.error){YAHOO.util.Dom.get("add_USER_record_status").innerHTML="";CPANEL.widgets.status_bar("add_USER_status_bar","error",CPANEL.lang.Error,g.cpanelresult.error)}else if(g.cpanelresult.data[0].result=="success"){b=get_lang_string("signup_welcome");d=get_lang_string("signup_info",{email:c});YAHOO.util.Dom.get("add_USER_record_status").innerHTML=
"";CPANEL.widgets.status_bar("add_USER_status_bar","success",b,d);setTimeout("window.location.reload(true)",1E4)}else{YAHOO.util.Dom.get("add_USER_record_status").innerHTML="";CPANEL.widgets.status_bar("add_USER_status_bar","error",CPANEL.lang.Error,g.cpanelresult.data[0].msg.replace(/\\/g,""))}}catch(h){YAHOO.util.Dom.get("add_USER_record_status").innerHTML="";CPANEL.widgets.status_bar("add_USER_status_bar","error",CPANEL.lang.json_error,CPANEL.lang.json_parse_failed)}},failure:function(){YAHOO.util.Dom.setStyle("add_USER_record_button",
"display","block");YAHOO.util.Dom.get("add_USER_record_status").innerHTML="";CPANEL.widgets.status_bar("add_USER_status_bar","error",CPANEL.lang.ajax_error,CPANEL.lang.ajax_try_again)}},"");YAHOO.util.Dom.setStyle("add_USER_record_button","display","none");a=get_lang_string("creating_account");YAHOO.util.Dom.get("add_USER_record_status").innerHTML=CPANEL.icons.ajax+" "+a},reset_form=function(){VALID=[];CF_RECS={};NUM_RECS=0;REC_TEXT=[];WWW_DOM_INFO=[]},add_validation=function(){},handleLearnMore=
function(b){if(b){YAHOO.util.Dom.setStyle("cf_def_show","display","none");YAHOO.util.Dom.setStyle("cf_def_noshow","display","block")}else{YAHOO.util.Dom.setStyle("cf_def_show","display","block");YAHOO.util.Dom.setStyle("cf_def_noshow","display","none")}return false},toggle_domain=function(){if(YAHOO.util.Dom.get("domain").value=="_select_")$("#add_record_and_zone_table").slideUp(CPANEL.JQUERY_ANIMATION_SPEED);else{$("#add_record_and_zone_table").slideDown(CPANEL.JQUERY_ANIMATION_SPEED);update_user_records_table()}reset_form("CNAME")},
update_zones=function(b,d,a,c){d=[];for(key in CF_RECS)CF_RECS[key]&&d.push(key);d={cpanel_jsonapi_version:2,cpanel_jsonapi_module:"CloudFlare",cpanel_jsonapi_func:"zone_set",zone_name:YAHOO.util.Dom.get("domain").value,user_key:USER_ID,subdomains:d.join(","),cf_recs:YAHOO.lang.JSON.stringify(CF_RECS),homedir:USER_HOME_DIR};if(a){d.old_rec=a;d.old_line=c}YAHOO.util.Connect.asyncRequest("GET",CPANEL.urls.json_api(d),{success:function(f){try{var g=YAHOO.lang.JSON.parse(f.responseText);if(g.cpanelresult.error)update_user_records_table(function(){CPANEL.widgets.status_bar("status_bar_"+
b,"error",CPANEL.lang.json_error,CPANEL.lang.json_parse_failed)});else g.cpanelresult.data[0].result=="error"?update_user_records_table(function(){CPANEL.widgets.status_bar("status_bar_"+b,"error",CPANEL.lang.json_error,g.cpanelresult.data[0].msg.replace(/\\/g,""))}):update_user_records_rows([b])}catch(h){update_user_records_table(function(){CPANEL.widgets.status_bar("status_bar_"+b,"error",CPANEL.lang.json_error,CPANEL.lang.json_parse_failed)})}},failure:function(){YAHOO.util.Dom.get("status_bar_"+
b).innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>"}},"");YAHOO.util.Dom.get("cloudflare_table_edit_"+b).innerHTML='<div style="padding: 20px">'+CPANEL.icons.ajax+" "+CPANEL.lang.ajax_loading+"</div>"},toggle_record_off=function(b,d,a){CF_RECS[d]=0;update_zones(b,"",d,a)},toggle_record_on=function(b,d,a){CF_RECS[d]=a;update_zones(b,"_off")},is_domain_cf_powered=function(b){for(var d=false,a=0,c=b.length;a<c;a++)if(b[a].type.match(/^(CNAME)$/)&&
b[a].cloudflare){d=true;break}return d},build_dnszone_cache=function(b){NUM_RECS=b.length;for(var d=get_lang_string("tooltip_zone_cf_on"),a=get_lang_string("tooltip_zone_cf_off"),c=0;c<b.length;c++)if(b[c].type.match(/^(CNAME)$/)){if(b[c].cloudflare==1){CF_RECS[b[c].name]=b[c].line;REC_TEXT[c]=d}else REC_TEXT[c]=a;if(b[c].name.match(/^(www\.)/))WWW_DOM_INFO=[c,b[c].name,b[c].line]}},build_dnszone_row_markup=function(b,d,a){var c="";if(b=="CNAME"){c+='<td id="name_value_'+d+'">'+a.type+"</td>";c+=
'<td id="type_value_'+d+'">'+a.name.substring(0,a.name.length-1)+"</td>";if(a.type=="CNAME")c+='<td colspan="2" id="value_value_hehe_'+d+'">points to '+a.cname+"</td>";c+="<td>";c+=a.cloudflare==1?'<span class="action_link" id="cloudflare_table_edit_'+d+'" onclick="toggle_record_off('+d+", '"+a.name+"', "+a.line+' )"><img src="../images/cloudflare/solo_cloud-55x25.png" class="cf_enabled" /></span>':'<span class="action_link" id="cloudflare_table_edit_'+d+'" onclick="toggle_record_on('+d+", '"+a.name+
"', "+a.line+' )"><img src="../images/cloudflare/solo_cloud_off-55x25.png" class="cf_disabled'+d+'"/></span>';c+="</td>"}return c},build_dnszone_table_markup=function(b){var d="rowA",a=YAHOO.util.Dom.get("domain").value,c='<table id="table_dns_zone" class="dynamic_table" border="0" cellspacing="0" cellpadding="0">';c+='<tr class="dt_header_row">';c+="<th>type</th>";c+="<th>name</th>";c+='<th colspan="2">record</th>';c+="<th>CloudFlare status</th>";c+="</tr>";build_dnszone_cache(b);for(var f=0;f<b.length;f++)if(b[f].type.match(/^(CNAME)$/)){c+=
'<tr id="info_row_'+f+'" class="dt_info_row '+d+'">';c+=build_dnszone_row_markup("CNAME",f,b[f]);c+="</tr>";c+='<tr id="module_row_'+f+'" class="dt_module_row '+d+'"><td colspan="7">';c+='<div id="dnszone_table_edit_div_'+f+'" class="dt_module"></div>';c+='<div id="dnszone_table_delete_div_'+f+'" class="dt_module"></div>';c+='<div id="status_bar_'+f+'" class="cjt_status_bar"></div>';c+="</td></tr>";d=d=="rowA"?d="rowB":"rowA"}for(f=0;f<b.length;f++)if(b[f].type.match(/^(A)$/)){c+='<tr id="info_row_a_'+
f+'" class="dt_info_row '+d+'">';c+='<td id="name_value_a_'+f+'">'+b[f].type+"</td>";c+='<td id="type_value_a_'+f+'">'+b[f].name.substring(0,b[f].name.length-1)+"</td>";if(b[f].type=="A")c+='<td colspan="2" id="value_value_hehe_a_'+f+'">'+b[f].address+"</td>";c+="<td>";c+='<a href="javascript:void(0);" onclick="show_a_help('+f+",'"+b[f].name+"')\">Want to run on CloudFlare?</a>";c+="</td>";c+="</tr>";c+='<tr id="module_row_a_'+f+'" class="dt_module_row '+d+'"><td colspan="7">';c+="</td></tr>";d=d==
"rowA"?d="rowB":"rowA"}c+="</table>";if(NUM_RECS>0)if(is_domain_cf_powered(b)){YAHOO.util.Dom.get("cf_powered_"+a).innerHTML="Powered by CloudFlare";YAHOO.util.Dom.get("cf_powered_stats"+a).innerHTML='<a href="javascript:void(0);" onclick="return get_stats(\''+a+"');\">Statistics and Settings</a>";YAHOO.util.Dom.get("cf_powered_check"+a).innerHTML='<img src="../images/cloudflare/solo_cloud-55x25.png" onclick="toggle_all_off(\''+a+"')\" />"}else{YAHOO.util.Dom.get("cf_powered_"+a).innerHTML="Not Powered by CloudFlare";
YAHOO.util.Dom.get("cf_powered_stats"+a).innerHTML="&nbsp;";YAHOO.util.Dom.get("cf_powered_check"+a).innerHTML='<img src="../images/cloudflare/solo_cloud_off-55x25.png" onclick="toggle_www_on(\''+a+"')\" />"}return c},update_user_records_rows=function(b,d){var a=YAHOO.util.Dom.get("domain").value,c={cpanel_jsonapi_version:2,cpanel_jsonapi_module:"CloudFlare",cpanel_jsonapi_func:"fetchzone",domain:YAHOO.util.Dom.get("domain").value,homedir:USER_HOME_DIR};YAHOO.util.Connect.asyncRequest("GET",CPANEL.urls.json_api(c),
{success:function(g){try{var h=YAHOO.lang.JSON.parse(g.responseText);if(h.cpanelresult.error)YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>";else if(h.cpanelresult.data){build_dnszone_cache(h.cpanelresult.data);g=0;for(var k=b.length;g<k;g++){var e=b[g],i=build_dnszone_row_markup("CNAME",e,h.cpanelresult.data[e]);$("#info_row_"+e).html(i);new YAHOO.widget.Tooltip("tt_cf_enabled_"+
e,{context:"cloudflare_table_edit_"+e,text:REC_TEXT[e],showDelay:300})}if(NUM_RECS>0)if(is_domain_cf_powered(h.cpanelresult.data)){YAHOO.util.Dom.get("cf_powered_"+a).innerHTML="Powered by CloudFlare";YAHOO.util.Dom.get("cf_powered_stats"+a).innerHTML='<a href="javascript:void(0);" onclick="return get_stats(\''+a+"');\">Statistics and Settings</a>";YAHOO.util.Dom.get("cf_powered_check"+a).innerHTML='<img src="../images/cloudflare/solo_cloud-55x25.png" onclick="toggle_all_off(\''+a+"')\" />"}else{YAHOO.util.Dom.get("cf_powered_"+
a).innerHTML="Not Powered by CloudFlare";YAHOO.util.Dom.get("cf_powered_stats"+a).innerHTML="&nbsp;";YAHOO.util.Dom.get("cf_powered_check"+a).innerHTML='<img src="../images/cloudflare/solo_cloud_off-55x25.png" onclick="toggle_www_on(\''+a+"')\" />"}d&&d();var j=YAHOO.util.Dom.getY("user_records_div");window.scrollTo(0,j)}else YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>"}catch(p){CPANEL.widgets.status_bar("add_CNAME_status_bar",
"error",CPANEL.lang.json_error,CPANEL.lang.json_parse_failed)}},failure:function(){YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>"}},"");c=0;for(var f=b.length;c<f;c++)YAHOO.util.Dom.get("cloudflare_table_edit_"+b[c]).innerHTML='<div style="padding: 20px">'+CPANEL.icons.ajax+" "+CPANEL.lang.ajax_loading+"</div>"},update_user_records_table=function(b){var d={cpanel_jsonapi_version:2,
cpanel_jsonapi_module:"CloudFlare",cpanel_jsonapi_func:"fetchzone",domain:YAHOO.util.Dom.get("domain").value,homedir:USER_HOME_DIR};YAHOO.util.Connect.asyncRequest("GET",CPANEL.urls.json_api(d),{success:function(a){try{var c=YAHOO.lang.JSON.parse(a.responseText);if(c.cpanelresult.error)YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>";else if(c.cpanelresult.data){var f=build_dnszone_table_markup(c.cpanelresult.data);
YAHOO.util.Dom.get("user_records_div").innerHTML='<a name="user_recs_'+YAHOO.util.Dom.get("domain").value+'"></a>'+f;for(a=0;a<NUM_RECS;a++)new YAHOO.widget.Tooltip("tt_cf_enabled_"+a,{context:"cloudflare_table_edit_"+a,text:REC_TEXT[a],showDelay:300});b&&b();var g=YAHOO.util.Dom.getY("user_records_div");window.scrollTo(0,g)}else YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>"}catch(h){CPANEL.widgets.status_bar("add_CNAME_status_bar",
"error",CPANEL.lang.json_error,CPANEL.lang.json_parse_failed)}},failure:function(){YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>"}},"");YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.ajax+" "+CPANEL.lang.ajax_loading+" [This may take several minutes]</div>"},refresh_records=function(b){var d={cpanel_jsonapi_version:2,cpanel_jsonapi_module:"CloudFlare",
cpanel_jsonapi_func:"fetchzone",domain:YAHOO.util.Dom.get("domain").value,homedir:USER_HOME_DIR};YAHOO.util.Connect.asyncRequest("GET",CPANEL.urls.json_api(d),{success:function(a){try{var c=YAHOO.lang.JSON.parse(a.responseText);if(c.cpanelresult.error)YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>";else if(c.cpanelresult.data){build_dnszone_cache(c.cpanelresult.data);b&&b()}else YAHOO.util.Dom.get("user_records_div").innerHTML=
'<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>"}catch(f){CPANEL.widgets.status_bar("add_CNAME_status_bar","error",CPANEL.lang.json_error,CPANEL.lang.json_parse_failed)}},failure:function(){YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>"}},"");YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+
CPANEL.icons.ajax+" "+CPANEL.lang.ajax_loading+" [This may take several minutes]</div>"},push_all_off=function(){var b=[];for(key in CF_RECS)CF_RECS[key]&&b.push(key+":"+CF_RECS[key]);b={cpanel_jsonapi_version:2,cpanel_jsonapi_module:"CloudFlare",cpanel_jsonapi_func:"zone_delete",zone_name:YAHOO.util.Dom.get("domain").value,user_key:USER_ID,subdomains:b.join(","),homedir:USER_HOME_DIR};YAHOO.util.Connect.asyncRequest("GET",CPANEL.urls.json_api(b),{success:function(d){try{var a=YAHOO.lang.JSON.parse(d.responseText);
if(a.cpanelresult.error)update_user_records_table(function(){CPANEL.widgets.status_bar("status_bar_0","error",CPANEL.lang.json_error,CPANEL.lang.json_parse_failed)});else a.cpanelresult.data[0].result=="error"?update_user_records_table(function(){CPANEL.widgets.status_bar("status_bar_0","error",CPANEL.lang.json_error,a.cpanelresult.data[0].msg.replace(/\\/g,""))}):update_user_records_table()}catch(c){update_user_records_table(function(){CPANEL.widgets.status_bar("status_bar_0","error",CPANEL.lang.json_error,
CPANEL.lang.json_parse_failed)})}},failure:function(){YAHOO.util.Dom.get("status_bar_0").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>"}},"")},toggle_www_on=function(b){reset_form();YAHOO.util.Dom.get("domain").value=b;update_user_records_table(function(){WWW_DOM_INFO[2]&&toggle_record_on(WWW_DOM_INFO[0],WWW_DOM_INFO[1],WWW_DOM_INFO[2])});return false},toggle_all_off=function(b){reset_form();YAHOO.util.Dom.get("domain").value=
b;refresh_records(push_all_off);return false},enable_domain=function(b){reset_form();YAHOO.util.Dom.get("domain").value=b;toggle_domain();return false},change_cf_setting=function(b,d,a){YAHOO.util.Dom.get("domain").value=b;if(a=="SecurityLevelSetting")a=YAHOO.util.Dom.get(a).value;d={cpanel_jsonapi_version:2,cpanel_jsonapi_module:"CloudFlare",cpanel_jsonapi_func:"zone_edit_cf_setting",zone_name:YAHOO.util.Dom.get("domain").value,user_email:USER_EMAIL,user_api_key:USER_API_KEY,v:a,a:d,homedir:USER_HOME_DIR};
YAHOO.util.Connect.asyncRequest("GET",CPANEL.urls.json_api(d),{success:function(c){try{var f=YAHOO.lang.JSON.parse(c.responseText);if(f.cpanelresult.error)YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>";else if(f.cpanelresult.data[0].result=="error")YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+f.cpanelresult.data[0].msg+"</div>";
else{get_stats(b);return false}}catch(g){YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+g+"</div>"}},failure:function(){YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>"}},"");return false},hide_a_help=function(b){YAHOO.util.Dom.get("module_row_a_"+b).innerHTML='<td colspan="7"></td>';OPEN_HELP=-1},show_a_help=function(b,d){if(OPEN_HELP>=
0)YAHOO.util.Dom.get("module_row_a_"+OPEN_HELP).innerHTML='<td colspan="7"></td>';YAHOO.util.Dom.get("module_row_a_"+b).innerHTML='<td colspan="7"><div style="padding: 20px">A type records cannot be directly routed though the CloudFlare network. Instead, click <a href="../zoneedit/advanced.html">here</a> and either switch the type of '+d+" to CNAME, or else make a new CNAME record pointing to "+d+"</div></td>";OPEN_HELP=b;return false},showHelp=function(b){var d={devmode:"CloudFlare makes your website load faster by caching static resources like images, CSS and Javascript. If you are editing cachable content (like images, CSS, or JS) and want to see the changes right away, you should enter <b>Development mode</b>. This will bypass CloudFlare's cache. Development mode will automatically toggle off after <b>3 hours</b>. Hint: Press shift-reload if you do not see your changes immediate. If you forget to enter Development mode, you should log in to your CloudFlare.com account and use Cache Purge.",
seclvl:" CloudFlare provides security for your website and you can adjust your security setting for each website. A <b>low</b> security setting will challenge only the most threatening visitors. A <b>high</b> security setting will challenge all visitors that have exhibited threatening behavior within the last 14 days. We recommend starting with a high or medium setting.",uniques:"Visitors are classified by regular traffic, search engine crawlers and threats. Unique visitors is defined by unique IP addresses.",
visits:"Traffic is classified by regular, search engine crawlers and threats. Page Views is defined by the number of requests to your site which return HTML.",pageload:"CloudFlare visits the home page of your website from several locations around the world from shared hosting. We do the same request twice: once through the CloudFlare system, and once directly to your site, so bypassing the CloudFlare system. We report both page load times here. CloudFlare improves the performance of your website by caching static resources like images, CSS and Javascript closer to your visitors and by compressing your requests so they are delivered quickly.",
hits:"CloudFlare sits in front of your server and acts as a proxy, which means your traffic passes through our network. Our network nodes are distributed all over the world. We cache your static resources like images, CSS and Javascript at these nodes and deliver them to your visitors in those regions. By serving certain resources from these nodes, not only do we make your website load faster for your visitors, but we save you requests from your origin server. This means that CloudFlare offsets load so your server can perform optimally. CloudFlare does not cache html.",
bandwidth:"Just like CloudFlare saves you requests to your origin server, CloudFlare also saves you bandwidth. By serving cached content from CloudFlare's nodes and by stopping threats before they reach your server, you will see less bandwidth usage from your origin server."};if("DN"in window){var a;if("CF"in window&&"lightbox"in window.CF){a=window.CF.lightbox;a.cfg.contentString=d[b]}else{window.CF=window.CF||{};window.CF.lightbox=a=new DN.Lightbox({contentString:d[b],animate:false,maxWidth:500})}a.show.call(a,
this)}return false},get_stats=function(b){reset_form();YAHOO.util.Dom.get("domain").value=b;var d=[];for(key in CF_RECS)CF_RECS[key]&&d.push(key);d={cpanel_jsonapi_version:2,cpanel_jsonapi_module:"CloudFlare",cpanel_jsonapi_func:"zone_get_stats",zone_name:YAHOO.util.Dom.get("domain").value,user_email:USER_EMAIL,user_api_key:USER_API_KEY,homedir:USER_HOME_DIR};YAHOO.util.Connect.asyncRequest("GET",CPANEL.urls.json_api(d),{success:function(a){try{var c=YAHOO.lang.JSON.parse(a.responseText);if(c.cpanelresult.error)YAHOO.util.Dom.get("user_records_div").innerHTML=
'<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>";else if(c.cpanelresult.data[0].result=="error")YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+c.cpanelresult.data[0].msg+"</div>";else{var f=c.cpanelresult.data[0].response.result,g=f.objs[0];c={decimalPlaces:0,decimalSeparator:".",thousandsSeparator:","};a={decimalPlaces:2,decimalSeparator:".",thousandsSeparator:","};var h=new Date(parseInt(f.timeZero)),
k=new Date(parseInt(f.timeEnd)),e;if(h>k){e="<p><b>Basic Statistics for "+YAHOO.util.Dom.get("domain").value+"</b></p>";e+='<p>Basic statistics update every 24 hours for the free service. For 15 minute statistics updates, advanced security and faster performance, upgrade to the <a href="https://www.cloudflare.com/pro-settings.html" target="_blank">Pro service</a>.</p>'}else{var i=YAHOO.util.Date.format(h,{format:"%B %e, %Y"}),j=YAHOO.util.Date.format(k,{format:"%B %e, %Y"});e=i===j?"<p><b>Basic Statistics for "+
YAHOO.util.Dom.get("domain").value+" &middot; "+i+"</b></p>":"<p><b>Basic Statistics for "+YAHOO.util.Dom.get("domain").value+" &middot; "+i+" to "+j+"</b></p>";e+='<table id="table_dns_zone" class="dynamic_table" border="0" cellspacing="0">';e+='<tr class="dt_header_row">';e+='<th width="100">&nbsp;</th>';e+="<th>regular traffic</th>";e+="<th>crawlers/bots</th>";e+="<th>threats</th>";e+="<th>info</th>";e+="</tr>";e+='<tr class="dt_module_row rowA">';e+='<td width="100">Page Views</td>';e+='<td style="text-align:center;">'+
YAHOO.util.Number.format(parseInt(g.trafficBreakdown.pageviews.regular),c)+"</td>";e+='<td style="text-align:center;">'+YAHOO.util.Number.format(parseInt(g.trafficBreakdown.pageviews.crawler),c)+"</td>";e+='<td style="text-align:center;">'+YAHOO.util.Number.format(parseInt(g.trafficBreakdown.pageviews.threat),c)+"</td>";e+='<td style="text-align:center;"><image src="../images/icons-custom/Info_16x16.png" width="13" height="13" onclick="showHelp(\'visits\')"></td>';e+="</tr>";e+='<tr class="dt_module_row rowB">';
e+='<td width="100">Unique Visitors</td>';e+='<td style="text-align:center;">'+YAHOO.util.Number.format(parseInt(g.trafficBreakdown.uniques.regular),c)+"</td>";e+='<td style="text-align:center;">'+YAHOO.util.Number.format(parseInt(g.trafficBreakdown.uniques.crawler),c)+"</td>";e+='<td style="text-align:center;">'+YAHOO.util.Number.format(parseInt(g.trafficBreakdown.uniques.threat),c)+"</td>";e+='<td style="text-align:center;"><image src="../images/icons-custom/Info_16x16.png" width="13" height="13" onclick="showHelp(\'uniques\')"></td>';
e+="</tr>";e+="</table>";e+='<p><table id="table_dns_zone" class="dynamic_table" border="0" cellspacing="0" cellpadding="0">';e+="<tr><td>";var p=YAHOO.util.Number.format(parseInt(g.requestsServed.cloudflare+g.requestsServed.user),c),r=YAHOO.util.Number.format(parseInt(g.requestsServed.cloudflare),c),n=parseInt(g.requestsServed.cloudflare)/parseInt(g.requestsServed.cloudflare+g.requestsServed.user)*100;if(isNaN(n))n=0;var l=parseFloat(g.bandwidthServed.cloudflare)+parseFloat(g.bandwidthServed.user),
m=parseFloat(g.bandwidthServed.cloudflare);f=m/l*100;if(isNaN(f))f=0;k=h=" KB";if(l>=102.4){l/=1024;h=" MB"}if(m>=102.4){m/=1024;k=" MB"}l=YAHOO.util.Number.format(l,a);m=YAHOO.util.Number.format(m,a);j=i=a=0;if(g.pageLoadTime){a=parseFloat(g.pageLoadTime.without);i=parseFloat(g.pageLoadTime.cloudflare);j=Math.floor((1-i/a)*100)+"%"}e+="</tr></td>";e+="</table></p>";e+='<div id="analytics-stats">';if(j){var s="https://chart.googleapis.com/chart?cht=bvs&chco=505151|e67300&chs=200x172&chbh=90,10,10&chd=t:"+
a+","+i+"&chxt=x&chxl=0:|Without%20CloudFlare|With%20CloudFlare&chds=0,5&chm=N%20*f*%20sec.,000000,0,-1,11&chds=0,"+1.1*Math.max(i,a);e+='<div class="analytics-speed-column" id="analytics-speed-time"> <h4 class="analytics-chartTitle"><span class="analytics-chartTitle-inner">Page Load Time <image src="../images/icons-custom/Info_16x16.png" width="13" height="13" onclick="showHelp(\'pageload\')"></span></h4>';e+='<table><tr><td> <span class="analytics-chart" id="analytics-speed-time-chart">  <img src="'+
s+'">  </span> </td></tr><tr><td><h5>CloudFlare makes your sites load about <span class="analytics-speed-info-percentFaster">'+j+"</span> faster.</h5></td></tr></table></div>"}else e+='<div class="analytics-speed-column" id="analytics-speed-time"> <h4 class="analytics-chartTitle"><span class="analytics-chartTitle-inner">Page Load Time <image src="../images/icons-custom/Info_16x16.png" width="13" height="13" onclick="showHelp(\'pageload\')"></span></h4>The page load time comparison is currently gathering data.</td></tr></table></div>';
e+='<div class="analytics-speed-column analytics-right-rail">';e+='<div id="analytics-speed-request"><h4 class="analytics-chartTitle"><span class="analytics-chartTitle-inner">Requests Saved <image src="../images/icons-custom/Info_16x16.png" width="13" height="13" onclick="showHelp(\'hits\')"></span></h4> <table><tr><td> <div class="analytics-chart" id="analytics-speed-requs-chart"> <img src="https://chart.googleapis.com/chart?cht=p&chco=ed7200|505151&chs=80x80&chd=t:'+n+","+(100-n)+'" width="80" height="80"> </div> </td><td> <div class="analytics-speed-savedByCF"><span id="analytics-speed-reqs-savedByCF">'+
r+'</span> requests saved by CloudFlare</div> <div class="analytics-speed-total"><span id="analytics-speed-reqs-total">'+p+"</span> total requests</div>  </td></tr></table></div>";e+='<div class="analytics-speed-column" id="analytics-speed-bandwidth"><h4 class="analytics-chartTitle"><span class="analytics-chartTitle-inner">Bandwidth Saved <image src="../images/icons-custom/Info_16x16.png" width="13" height="13" onclick="showHelp(\'bandwidth\')"></span></h4> <table><tr><td> <div class="analytics-chart" id="analytics-speed-bandwidth-chart"> <img src="https://chart.googleapis.com/chart?cht=p&chco=ed7200|505151&chs=80x80&chd=t:'+
f+","+(100-f)+'" width="80" height="80"> </div> </td><td> <div class="analytics-speed-savedByCF"><span id="analytics-speed-bandwidth-savedByCF">'+m+k+'</span> bandwidth saved by CloudFlare</div> <div class="analytics-speed-total"><span id="analytics-speed-bandwidth-total">'+l+h+"</span> total bandwidth</div>  </td></tr></table> </div>";e+="</div></div>";e+='<div id="analytics-cta-row"><div id="analytics-cta" class="ctaButton"><a class="inner" href="http://www.cloudflare.com/analytics.html" target="_blank"><span class="label">See more statistics</span></a></div></div>';
e+='<p>Note: Basic statistics update every 24 hours. For 15 minute statistics updates, advanced security and faster performance, upgrade to the <a href="https://www.cloudflare.com/pro-settings.html" target="_blank">Pro service</a>.</p>'}e+='<A NAME="infobox"></A>';e+='<p id="cf-settings"><b>Cloudflare Settings for '+YAHOO.util.Dom.get("domain").value+"</b></p>";e+='<p><table id="table_dns_zone" class="dynamic_table" border="0" cellspacing="0" cellpadding="0">';var o=g.userSecuritySetting,q=g.dev_mode*
1E3,t=g.currentServerTime;(new Date).getTimezoneOffset();e+='<tr class="dt_module_row rowA">';e+='<td width="280">CloudFlare security setting</td>';e+='<td><select name="SecurityLevelSetting" id="SecurityLevelSetting" onChange="change_cf_setting(\''+b+"', 'sec_lvl', 'SecurityLevelSetting')\">";e+='<option value="high"'+(o=="High"?"selected":"")+">High</option>";e+='<option value="med"'+(o=="Medium"?"selected":"")+">Medium</option>";e+='<option value="low"'+(o=="Low"?"selected":"")+">Low</option>";
e+="</select></td><td>&nbsp;</td>";e+='<td style="text-align:center;"><image src="../images/icons-custom/Info_16x16.png" width="13" height="13" onclick="showHelp(\'seclvl\')"></td></tr>';e+='<tr class="dt_module_row rowB">';e+=q>t?'<td width="280">Development Mode will end at</td><td>'+YAHOO.util.Date.format(new Date(q),{format:"%D %T"})+'</td><td>Click <a href="javascript:void(0);" onclick="change_cf_setting(\''+b+"', 'devmode', 0)\">here</a> to disable</td>":'<td width="280">Development Mode is currently</td><td>off</td><td>Click <a href="javascript:void(0);" onclick="change_cf_setting(\''+
b+"', 'devmode', 1)\">here</a> to enable</td>";e+='<td style="text-align:center;"><image src="../images/icons-custom/Info_16x16.png" width="13" height="13" onclick="showHelp(\'devmode\')"></td>';e+="</tr>";e+="</table></p>";e+='<p>For more statistics and settings, sign into your account at <a href="https://www.cloudflare.com/analytics.html" target="_blank">CloudFlare</a>.</p>';YAHOO.util.Dom.get("user_records_div").innerHTML=e}}catch(u){YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+
CPANEL.icons.error+" "+u+"</div>"}},failure:function(){YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.error+" "+CPANEL.lang.ajax_error+": "+CPANEL.lang.ajax_try_again+"</div>"}},"");YAHOO.util.Dom.get("user_records_div").innerHTML='<div style="padding: 20px">'+CPANEL.icons.ajax+" "+CPANEL.lang.ajax_loading+"</div>";return false},init_page=function(){var b=document.getElementById("USER_submit");YAHOO.util.Event.addListener(b,"click",signup_to_cf);YAHOO.util.Event.on("domain",
"change",toggle_domain);add_validation();YAHOO.util.Dom.get("domain").value!="_select_"&&update_user_records_table()};YAHOO.util.Event.onDOMReady(init_page);(function(){var b=[["div.dt_module","display:none"]],d=document.styleSheets[0];"insertRule"in d?b.forEach(function(a){d.insertRule(a[0]+" {"+a[1]+"}",0)}):b.forEach(function(a){d.addRule(a[0],a[1],0)})})();
