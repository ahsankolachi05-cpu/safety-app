function IMGDATA(n){ return (window.IMGDATA||{})[n] || ""; }

    (function(){
      "use strict";
      var $ = function(s, el){ return (el||document).querySelector(s); };
      var $$ = function(s, el){ return Array.prototype.slice.call((el||document).querySelectorAll(s)); };
      function esc(t){ return String(t==null?"":t).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
      var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      function fmtDate(iso){ if(!iso) return "—"; var p = iso.split("-"); return parseInt(p[2],10) + " " + MONTHS[parseInt(p[1],10)-1] + " " + p[0]; }
      /* Date entry is always UK format DD/MM/YYYY; records store ISO internally. */
      function isoToUk(iso){ if(!iso) return ""; var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
      function parseUkDate(v){
        var m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec((v||"").trim());
        if(!m) return null;
        var d = parseInt(m[1],10), mo = parseInt(m[2],10), y = parseInt(m[3],10);
        if(mo < 1 || mo > 12 || d < 1 || d > 31) return null;
        var dt = new Date(y, mo - 1, d);
        if(dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
        return y + "-" + (mo < 10 ? "0" : "") + mo + "-" + (d < 10 ? "0" : "") + d;
      }
      /* Slash-mask + validation for every .uk-date text input. */
      $$(".uk-date").forEach(function(inp){
        var msg = document.getElementById("err-" + inp.id);
        inp.addEventListener("input", function(){
          var dg = inp.value.replace(/\D/g, "").slice(0, 8), out = dg;
          if(dg.length > 4) out = dg.slice(0,2) + "/" + dg.slice(2,4) + "/" + dg.slice(4);
          else if(dg.length > 2) out = dg.slice(0,2) + "/" + dg.slice(2);
          inp.value = out;
          inp.classList.remove("err"); if(msg) msg.classList.remove("show");
        });
        inp.addEventListener("blur", function(){
          var v = inp.value.trim(); if(!v) return;
          var iso = parseUkDate(v);
          if(iso){ inp.value = isoToUk(iso); }
          else { inp.classList.add("err"); if(msg) msg.classList.add("show"); }
        });
      });
      function initials(name){ return name.split(/\s+/).filter(Boolean).slice(0,2).map(function(w){ return w[0]; }).join("").toUpperCase(); }

      /* ================= Sample data ================= */
      var AV_COLORS = ["#0e2c5e","#128a4c","#7a3b06","#5b21b6","#0e7490","#9f1239"];
      var SECTOR_IMG = {
        "Offices":IMGDATA("img1"), "Healthcare":IMGDATA("img2"),
        "Education":IMGDATA("img0"), "Hospitality":IMGDATA("img0"),
        "Retail":IMGDATA("img1"), "Community Services":IMGDATA("img1"),
        "Professional Services":IMGDATA("img0"), "Other Workplace":IMGDATA("img1")
      };
      var CLIENTS = [
        {id:"c1", name:"Hartfield Business Centre Ltd", sector:"Offices", town:"Leeds", contact:"Sarah Mitchell", email:"s.mitchell@hartfieldbc.co.uk", phone:"0113 496 0210", site:"Hartfield House, Wellington Street, Leeds LS1 4LT", since:"Mar 2023", sites:2, open:3},
        {id:"c2", name:"Northgate College", sector:"Education", town:"Milton Keynes", contact:"David Okafor", email:"d.okafor@northgatecollege.ac.uk", phone:"01908 664 320", site:"Central Campus, Milton Keynes MK9 3BZ", since:"Jan 2024", sites:3, open:2},
        {id:"c3", name:"Kingsway Hotel Group", sector:"Hospitality", town:"Manchester", contact:"Paul Redfern", email:"p.redfern@kingswayhotels.co.uk", phone:"0161 496 0877", site:"Kingsway Hotel, Oxford Road, Manchester M1 5QA", since:"Jun 2022", sites:5, open:4},
        {id:"c4", name:"Elm Court Care Homes", sector:"Healthcare", town:"Harrogate", contact:"Dr Anita Rao", email:"a.rao@elmcourtcares.co.uk", phone:"01423 229 841", site:"Elm Court, 22 Kings Road, Harrogate HG1 2AB", since:"Sep 2025", sites:1, open:1},
        {id:"c5", name:"Willow Retail Group", sector:"Retail", town:"Sheffield", contact:"Tom Ellery", email:"t.ellery@willowretail.co.uk", phone:"0114 496 5531", site:"Willow Parade, Sheffield S1 2GH", since:"Feb 2024", sites:1, open:0},
        {id:"c6", name:"Ashdown Community Trust", sector:"Community Services", town:"Reading", contact:"Claire Donnelly", email:"c.donnelly@ashdowntrust.org.uk", phone:"0118 496 9024", site:"Ashdown Community Centre, Forbury Road, Reading RG1 1AX", since:"Nov 2023", sites:2, open:1}
      ];
      function clientById(id){ for(var i=0;i<CLIENTS.length;i++) if(CLIENTS[i].id===id) return CLIENTS[i]; return CLIENTS[0]; }

      var ASSESSMENTS = [
        {id:"a1", ref:"RA-118", title:"Office workplace assessment", clientId:"c1", site:"Hartfield House, Leeds", date:"2026-10-09", review:"2027-10-09", status:"In Progress",
         notes:"Review of office floors, meeting rooms and shared staff facilities. Follow-up visit booked to confirm workstation actions.",
         photos:[IMGDATA("img1"),IMGDATA("img0")],
         hazards:[
           {name:"Trailing cables and overloaded extension leads at shared workstations", people:"Office staff, cleaners and visitors", controls:"Cable trays fitted to most desks; electrical testing in date", l:3, s:3, action:"Remove damaged extension leads and complete cable management for the remaining desks by Dec 2026."},
           {name:"Poorly adjusted display screen equipment", people:"Office staff and hybrid workers", controls:"DSE self-assessments issued to all teams", l:3, s:2, action:"Complete outstanding workstation checks and provide monitor arms where recommended."},
           {name:"Access route to first-aid room partially obstructed", people:"Staff and visitors needing first aid", controls:"First aiders identified on each floor", l:2, s:4, action:"Keep the route clear at all times and add it to the daily opening checks."}
         ]},
        {id:"a2", ref:"RA-121", title:"Campus safety & visitor routes", clientId:"c2", site:"Northgate College central campus", date:"2026-10-16", review:"2027-04-16", status:"Draft",
         notes:"Walked the main student, staff and visitor routes with the facilities manager. Entrance matting and corridor signage need attention before the winter term.",
         photos:[IMGDATA("img0"),IMGDATA("img1")],
         hazards:[
           {name:"Congested main corridor during lesson changeover", people:"Students, teaching staff and visitors", controls:"One-way flow in place at peak times; staff supervision rota", l:3, s:3, action:"Review timetable pinch points and refresh route signage before the next term."},
           {name:"Slip risk at the main entrance in wet weather", people:"Students, staff and visitors", controls:"Entrance matting fitted; cleaning team on rota", l:3, s:2, action:"Extend entrance matting and place wet-floor signs at both entrances."}
         ]},
        {id:"a3", ref:"RA-115", title:"Hotel fire & guest safety review", clientId:"c3", site:"Kingsway Hotel, Manchester", date:"2026-09-28", review:"2027-09-28", status:"Completed",
         notes:"Completed with the duty manager. Guest evacuation arrangements and staff training records were reviewed.",
         photos:[IMGDATA("img0"),IMGDATA("img1")],
         hazards:[
           {name:"Fire doors held open in guest corridors", people:"Hotel guests and night staff", controls:"Alarm-linked door retainers fitted on most floors", l:2, s:5, action:"Brief all staff and add fire-door checks to the nightly walk-round."},
           {name:"Emergency lighting test records incomplete", people:"Guests and staff during an evacuation", controls:"Monthly tests carried out by the maintenance team", l:2, s:4, action:"Complete the record book and audit it monthly with the duty manager."}
         ]},
        {id:"a4", ref:"RA-122", title:"Fire safety & evacuation review", clientId:"c4", site:"Elm Court care home, Harrogate", date:"2026-10-14", review:"2027-10-14", status:"In Progress",
         notes:"Night-time evacuation timings observed. Two residents require updated personal emergency evacuation plans.",
         photos:[IMGDATA("img2")],
         hazards:[
           {name:"Delayed evacuation of residents with limited mobility", people:"Residents, night staff, visiting families", controls:"Evacuation chairs on both stairwells; PEEPs in place for most residents", l:3, s:5, action:"Update the two outstanding PEEPs and run a night-time drill before 30 Nov 2026."},
           {name:"Fire doors wedged open in the laundry corridor", people:"Residents and staff on the ground floor", controls:"Alarm-linked door retainers fitted", l:2, s:4, action:"Brief all staff; add door checks to the daily opening checklist."}
         ]},
        {id:"a5", ref:"RA-109", title:"Retail workplace & customer safety review", clientId:"c5", site:"Willow Parade store, Sheffield", date:"2026-08-19", review:"2027-08-19", status:"Completed",
         notes:"General review of the sales floor, staff areas and customer access routes. Standards were good overall.",
         photos:[IMGDATA("img1"),IMGDATA("img0")],
         hazards:[
           {name:"Obstructed staff access route behind the service counter", people:"Retail staff and cleaners", controls:"Daily opening checks in place", l:2, s:3, action:"Keep the route clear and brief the team at the next store meeting."},
           {name:"Damaged display fixture at the main entrance", people:"Customers and staff", controls:"Fixture cordoned off and defect logged", l:2, s:2, action:"Repair or replace the fixture and record the sign-off."}
         ]}
      ];

      var INSPECTIONS = [
        {id:"i1", title:"General workplace inspection", clientId:"c2", site:"Northgate College central campus", date:"2026-10-16", time:"10:00", status:"In progress", checked:4, total:9, fails:1},
        {id:"i2", title:"Hotel safety inspection", clientId:"c3", site:"Kingsway Hotel, Manchester", date:"2026-10-19", time:"09:30", status:"Scheduled", checked:0, total:11, fails:0},
        {id:"i3", title:"Annual fire safety inspection", clientId:"c4", site:"Elm Court, Harrogate", date:"2026-10-21", time:"11:00", status:"Scheduled", checked:0, total:8, fails:0},
        {id:"i4", title:"Community centre safety inspection", clientId:"c6", site:"Ashdown Community Centre, Reading", date:"2026-10-14", time:"10:30", status:"Completed", checked:7, total:7, fails:2}
      ];

      var CHECKLIST = [
        {group:"Housekeeping & access routes", sub:"General condition of the working environment", items:[
          {q:"Access routes clearly marked and free of obstruction", d:"Check all main corridors and crossing points"},
          {q:"Floors clean, dry and in good repair", d:"Look for spillages, trailing cables and damaged surfaces"},
          {q:"Emergency exits and escape routes unobstructed", d:"Test push-bar doors where fitted"}
        ]},
        {group:"Workplace facilities & storage", sub:"General facilities, storage and manual handling in work areas", items:[
          {q:"Storage secure, stable and free from damage", d:"Check cupboards and stored items in all work areas"},
          {q:"Items stored within safe limits and evenly distributed", d:"Check storage areas for overloading"},
          {q:"Stored items kept clear of access routes and exits", d:"No items obstructing access routes or emergency exits"}
        ]},
        {group:"Fire & emergency", sub:"Fire precautions and emergency arrangements", items:[
          {q:"Fire extinguishers in place, serviced and accessible", d:"Check service labels are in date"},
          {q:"Fire alarm call points unobstructed and tested weekly", d:"Ask to see the alarm test log"},
          {q:"Emergency lighting operating in escape routes", d:"Check monthly test records"}
        ]}
      ];
      var checklistState = {}; // key "g-i" -> {state, note}

      var REPORTS = [
        {id:"r1", ref:"RPT-2042", title:"General Workplace Inspection Report", clientId:"c2", site:"Northgate College central campus", date:"2026-10-13", status:"In Review", type:"Inspection",
         summary:"A general workplace inspection of the Northgate College central campus was carried out on 12 October 2026. Housekeeping, access routes and emergency arrangements were generally good. Three findings require attention, including one higher-risk item affecting safe access.",
         findings:[
           {title:"Damaged cupboard in a shared staff area", l:3, s:4, text:"Damage to a storage cupboard door in a shared staff area. The cupboard remains in use.", rec:"Take the cupboard out of use, arrange repair and have it signed off by a competent person by 30 Oct 2026."},
           {title:"Worn floor markings at the main entrance", l:4, s:3, text:"Markings on access routes have worn away in several places, particularly near the main entrance.", rec:"Refresh the markings and review visitor routes before the next scheduled visit."},
           {title:"Fire extinguisher service overdue", l:2, s:3, text:"Two extinguishers in a shared facilities area are two months past their service date.", rec:"Arrange servicing within 7 days and add the location to the monthly checks."}
         ]},
        {id:"r2", ref:"RPT-2041", title:"Hotel Safety Report — September", clientId:"c3", site:"Kingsway Hotel, Manchester", date:"2026-10-02", status:"Completed", type:"Inspection",
         summary:"Monthly hotel safety inspection covering fire precautions, guest access routes and staff areas. Standards remain good; two medium-risk actions were raised and have since been closed out.",
         findings:[
           {title:"Emergency lighting test records incomplete", l:2, s:4, text:"Monthly tests are taking place but two records were missing signatures.", rec:"Brief duty managers on record-keeping and audit the log monthly."},
           {title:"Staff access route obstructed", l:2, s:2, text:"Housekeeping supplies were found blocking a staff corridor during the visit.", rec:"Clear the route and brief the housekeeping team within 7 days."}
         ]},
        {id:"r3", ref:"RPT-2044", title:"Fire Safety Report — Elm Court", clientId:"c4", site:"Elm Court care home, Harrogate", date:"2026-10-15", status:"Draft", type:"Assessment",
         summary:"Interim fire safety report drafted from the October assessment. Evacuation arrangements are sound, with two personal emergency evacuation plans still to be updated.",
         findings:[
           {title:"Two PEEPs require updating", l:3, s:5, text:"Two residents' mobility needs have changed since their plans were written.", rec:"Update both PEEPs with the care team and rehearse at the next drill."}
         ]},
        {id:"r4", ref:"RPT-2040", title:"Office Workplace Assessment Report", clientId:"c1", site:"Hartfield House, Leeds", date:"2026-09-24", status:"Completed", type:"Assessment",
         summary:"Office workplace assessment covering workstations, shared facilities and access routes. One higher-risk item was identified and an action plan agreed with management.",
         findings:[
           {title:"Workstation actions outstanding for new starters", l:3, s:3, text:"Four recent starters have not completed a workstation assessment.", rec:"Complete the assessments within 30 days and keep records centrally."}
         ]},
        {id:"r5", ref:"RPT-2043", title:"Community Centre Safety Review Report", clientId:"c6", site:"Ashdown Community Centre, Reading", date:"2026-10-15", status:"In Review", type:"Inspection",
         summary:"General safety review of public areas, staff facilities and emergency arrangements. Standards were good overall; first-aid provision needs a refresh.",
         findings:[
           {title:"First-aid provision review outstanding", l:2, s:2, text:"Two first-aid kits are due for restocking and one trained first aider has left.", rec:"Restock the kits and book refresher training within 30 days."}
         ]}
      ];

      var WEEK = [
        {dow:"Mon", day:12},{dow:"Tue", day:13},{dow:"Wed", day:14},{dow:"Thu", day:15},{dow:"Fri", day:16, today:true},{dow:"Sat", day:17},{dow:"Sun", day:18}
      ];
      var EVENTS = {
        12:[{time:"10:00", title:"General workplace inspection", where:"Northgate College · Milton Keynes", nav:"view-inspection-detail", type:"insp"}],
        13:[{time:"14:00", title:"New client onboarding call", where:"Elm Court Care Homes · Video call", nav:"view-clients", type:"meet"}],
        14:[{time:"10:30", title:"Community centre safety inspection", where:"Ashdown Community Trust · Reading", nav:"view-inspections", type:"insp"},
            {time:"15:00", title:"Issue report RPT-2041", where:"Kingsway Hotel Group", nav:"view-report-preview", type:"report"}],
        15:[{time:"09:00", title:"Fire assessment write-up", where:"Elm Court Care Homes · Office", nav:"view-assessment-detail", type:"assess"}],
        16:[{time:"10:00", title:"General workplace inspection", where:"Northgate College · Milton Keynes", nav:"view-inspection-detail", type:"insp"},
            {time:"13:30", title:"Fire safety & evacuation review", where:"Elm Court Care Homes · Harrogate", nav:"view-assessment-detail", type:"assess"},
            {time:"15:45", title:"New client onboarding call", where:"Elm Court Care Homes · Video call", nav:"view-clients", type:"meet"}],
        17:[],
        18:[]
      };
      var TASKS = [
        {id:"t1", title:"Repair damaged cupboard in shared staff area", client:"Northgate College", due:"Due 30 Oct", overdue:false, done:false},
        {id:"t2", title:"Send PEEP update forms to care team", client:"Elm Court Care Homes", due:"Overdue · was due 10 Oct", overdue:true, done:false},
        {id:"t3", title:"Verify workstation cable management", client:"Hartfield Business Centre Ltd", due:"Overdue · was due 12 Oct", overdue:true, done:false},
        {id:"t4", title:"Book first-aid refresher training", client:"Willow Retail Group", due:"Due 24 Oct", overdue:false, done:false},
        {id:"t5", title:"Review draft report RPT-2044", client:"Elm Court Care Homes", due:"Due 17 Oct", overdue:false, done:false},
        {id:"t6", title:"Sign off emergency lighting checks", client:"Kingsway Hotel Group", due:"Completed 11 Oct", overdue:false, done:true}
      ];

      /* ================= Risk helpers ================= */
      function riskOf(l, s){
        var score = l * s;
        if(score >= 17) return {score:score, label:"Very high", band:"vhigh", chip:"red"};
        if(score >= 10) return {score:score, label:"High", band:"high", chip:"orange"};
        if(score >= 5)  return {score:score, label:"Medium", band:"med", chip:"amber"};
        return {score:score, label:"Low", band:"low", chip:"green"};
      }
      function worstRisk(hazards){
        var worst = {score:0, label:"Low", band:"low", chip:"green"};
        hazards.forEach(function(h){ var r = riskOf(h.l, h.s); if(r.score > worst.score) worst = r; });
        return worst;
      }
      function statusChip(status){
        if(status === "Completed") return '<span class="chip green">Completed</span>';
        if(status === "In Review" || status === "In Progress" || status === "In progress") return '<span class="chip amber">' + status + '</span>';
        if(status === "Scheduled") return '<span class="chip navy">Scheduled</span>';
        return '<span class="chip grey">' + status + '</span>';
      }
      var L_WORDS = ["","Rare","Unlikely","Possible","Likely","Almost certain"];
      var S_WORDS = ["","Negligible","Minor","Moderate","Major","Catastrophic"];

      /* ================= Navigation ================= */
      var stack = ["view-welcome"];
      var TAB_FOR = {
        "view-dashboard":"view-dashboard",
        "view-clients":"view-clients", "view-client":"view-clients", "view-client-form":"view-clients",
        "view-assessments":"view-assessments", "view-assessment-detail":"view-assessments", "view-assessment-form":"view-assessments",
        "view-reports":"view-reports", "view-report-preview":"view-reports",
        "view-profile":"view-profile",
        "view-inspections":"view-dashboard", "view-inspection-detail":"view-dashboard", "view-inspection-form":"view-dashboard",
        "view-calendar":"view-dashboard"
      };
      var loggedIn = false;
      function current(){ return stack[stack.length-1]; }
      function show(id){
        $$(".view").forEach(function(v){ v.classList.toggle("active", v.id === id); });
        var view = document.getElementById(id);
        if(view){ var sc = $(".view-scroll", view); if(sc) sc.scrollTop = 0; }
        $("#statusbar").classList.toggle("light", !!(view && view.getAttribute("data-bar") === "light"));
        var tab = TAB_FOR[id];
        $$("#tabbar button").forEach(function(b){ b.classList.toggle("active", b.getAttribute("data-tab") === tab); });
      }
      function go(id){
        if(id === current()){ show(id); return; }
        stack.push(id); show(id);
      }
      function goRoot(id){ stack = [id]; show(id); }
      function back(){
        if(stack.length > 1){ stack.pop(); }
        show(current());
      }
      function ensureIn(){
        if(!loggedIn){ loggedIn = true; $("#tabbar").hidden = false; }
      }

      /* ================= Toast / sheet / modal ================= */
      var toastTimer = null;
      function toast(msg){
        var t = $("#toast");
        t.innerHTML = '<span class="t-ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span><span>' + msg + "</span>";
        t.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function(){ t.classList.remove("show"); }, 3000);
      }
      function openSheet(html){ $("#sheet").innerHTML = '<div class="grab"></div>' + html; $("#sheet").classList.add("show"); $("#scrim").classList.add("show"); }
      function openModal(html){ $("#modal").innerHTML = html; $("#modal").classList.add("show"); $("#scrim").classList.add("show"); }
      function closeOverlays(){ $("#sheet").classList.remove("show"); $("#modal").classList.remove("show"); $("#scrim").classList.remove("show"); }
      $("#scrim").addEventListener("click", closeOverlays);

      /* ================= Clock & greeting ================= */
      function tickClock(){
        var d = new Date();
        var hh = String(d.getHours()).padStart(2,"0"), mm = String(d.getMinutes()).padStart(2,"0");
        $("#clock").textContent = hh + ":" + mm;
        var h = d.getHours();
        $("#greeting").textContent = h < 12 ? "Good morning" : (h < 18 ? "Good afternoon" : "Good evening");
      }
      tickClock(); setInterval(tickClock, 30000);

      /* ================= Auth ================= */
      var authMode = "signin";
      function setAuthMode(mode){
        authMode = mode;
        var reg = mode === "register";
        $("#tab-signin").classList.toggle("on", !reg);
        $("#tab-register").classList.toggle("on", reg);
        $("#tab-signin").setAttribute("aria-selected", String(!reg));
        $("#tab-register").setAttribute("aria-selected", String(reg));
        $("#field-name").hidden = !reg;
        $("#auth-title").textContent = reg ? "Create your account" : "Welcome back";
        $("#auth-lead").textContent = reg
          ? "Set up your consultancy workspace to manage clients, assessments and reports in one place."
          : "Sign in to your consultancy workspace to pick up today\u2019s visits and outstanding actions.";
        $("#auth-submit").textContent = reg ? "Create account" : "Sign in securely";
      }
      $("#tab-signin").addEventListener("click", function(){ setAuthMode("signin"); });
      $("#tab-register").addEventListener("click", function(){ setAuthMode("register"); });
      $("#pw-toggle").addEventListener("click", function(){
        var p = $("#auth-pass");
        var showPw = p.type === "password";
        p.type = showPw ? "text" : "password";
        this.setAttribute("aria-label", showPw ? "Hide password" : "Show password");
      });
      $("#forgot-link").addEventListener("click", function(){
        toast("Password reset link sent \u2014 demo only, nothing leaves this prototype.");
      });
      $("#auth-form").addEventListener("submit", function(e){
        e.preventDefault();
        var email = $("#auth-email"), pass = $("#auth-pass"), ok = true;
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
        email.classList.toggle("err", !emailOk);
        $("#err-email").classList.toggle("show", !emailOk);
        if(!emailOk) ok = false;
        var passOk = pass.value.length >= 8;
        pass.classList.toggle("err", !passOk);
        $("#err-pass").classList.toggle("show", !passOk);
        if(!passOk) ok = false;
        if(authMode === "register" && !$("#auth-name").value.trim()){ $("#auth-name").classList.add("err"); ok = false; }
        if(!ok) return;
        var btn = $("#auth-submit");
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span>' + (authMode === "register" ? "Creating your account\u2026" : "Signing you in\u2026");
        setTimeout(function(){
          btn.disabled = false;
          btn.textContent = authMode === "register" ? "Create account" : "Sign in securely";
          ensureIn();
          goRoot("view-dashboard");
          toast(authMode === "register" ? "Account created \u2014 welcome to AssurePoint." : "Signed in \u2014 welcome back, Steve.");
          setAuthMode("signin");
        }, 900);
      });

      /* ================= Clients ================= */
      var clientSectorFilter = "All";
      function renderClients(){
        var q = ($("#client-search").value || "").toLowerCase().trim();
        var list = CLIENTS.filter(function(c){
          var matchSector = clientSectorFilter === "All" || c.sector === clientSectorFilter;
          var matchQ = !q || (c.name + " " + c.sector + " " + c.town + " " + c.contact).toLowerCase().indexOf(q) > -1;
          return matchSector && matchQ;
        });
        var el = $("#client-list");
        el.innerHTML = list.map(function(c, i){
          var col = AV_COLORS[CLIENTS.indexOf(c) % AV_COLORS.length];
          return '<button class="row-item" data-client="' + c.id + '">' +
            '<span class="avatar" style="width:48px;height:48px;background:' + col + ';font-size:15px;">' + initials(c.name) + '</span>' +
            '<span class="r-main"><b>' + esc(c.name) + '</b><span>' + esc(c.sector) + " \u00B7 " + esc(c.town) + " \u00B7 " + c.sites + (c.sites === 1 ? " site" : " sites") + '</span></span>' +
            '<span class="r-side">' + (c.open > 0 ? '<span class="chip amber">' + c.open + ' open</span>' : '<span class="chip green">Up to date</span>') + '</span>' +
            '<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>' +
          '</button>';
        }).join("");
        $("#client-empty").hidden = list.length > 0;
        el.style.display = list.length ? "" : "none";
        $("#clients-count").textContent = list.length + (list.length === 1 ? " client record" : " client records") + " \u00B7 sample data";
      }
      $("#client-search").addEventListener("input", renderClients);
      $("#client-filters").addEventListener("click", function(e){
        var b = e.target.closest("[data-sector]"); if(!b) return;
        $$("#client-filters .fchip").forEach(function(c){ c.classList.remove("on"); });
        b.classList.add("on");
        clientSectorFilter = b.getAttribute("data-sector");
        renderClients();
      });

      var activeClientId = "c1";
      function historyRow(kind, refTxt, title, meta, chipHtml, nav){
        return '<button class="row-item" data-nav="' + nav + '">' +
          '<span class="r-main"><b>' + esc(title) + '</b><span>' + esc(refTxt) + " \u00B7 " + esc(meta) + '</span></span>' +
          '<span class="r-side">' + chipHtml + '</span>' +
          '<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>';
      }
      function openClient(id){
        activeClientId = id;
        var c = clientById(id);
        var _csrc = SECTOR_IMG[c.sector] || IMGDATA("img1");
        if (_csrc) $("#cd-img").src = _csrc;
        $("#cd-img").alt = esc(c.name) + " site photograph";
        $("#cd-name").textContent = c.name;
        $("#cd-sub").textContent = c.sector + " \u00B7 " + c.town + " \u00B7 client since " + c.since;
        $("#cd-contact").textContent = c.contact;
        $("#cd-email").textContent = c.email;
        $("#cd-phone").textContent = c.phone;
        $("#cd-site").textContent = c.site;
        $("#cd-sector").textContent = c.sector;
        $("#cd-since").textContent = c.since;
        var ca = ASSESSMENTS.filter(function(a){ return a.clientId === id; });
        var ci = INSPECTIONS.filter(function(a){ return a.clientId === id; });
        var cr = REPORTS.filter(function(a){ return a.clientId === id; });
        $("#cd-n-assess").textContent = ca.length;
        $("#cd-n-insp").textContent = ci.length;
        $("#cd-n-rep").textContent = cr.length;
        var rows = "";
        ca.forEach(function(a){ rows += historyRow("assess", a.ref, a.title, fmtDate(a.date), statusChip(a.status), "view-assessment-detail"); });
        ci.forEach(function(a){ rows += historyRow("insp", a.title, a.site, fmtDate(a.date), statusChip(a.status), "view-inspection-detail"); });
        cr.forEach(function(a){ rows += historyRow("report", a.ref, a.title, fmtDate(a.date), statusChip(a.status), "view-report-preview"); });
        $("#cd-history").innerHTML = rows || '<div class="empty"><h4>No history yet</h4><p>Assessments, inspections and reports for this client will appear here.</p></div>';
        go("view-client");
      }
      $("#cd-edit").addEventListener("click", function(){ openClientForm(activeClientId); });
      $("#cd-new-assessment").addEventListener("click", function(){ openAssessmentForm(null, activeClientId); });

      var editingClientId = null;
      function openClientForm(id){
        editingClientId = id || null;
        $("#cf-title").textContent = id ? "Edit client" : "Add client";
        var c = id ? clientById(id) : null;
        $("#cf-company").value = c ? c.name : "";
        $("#cf-sector").value = c ? c.sector : "Offices";
        $("#cf-sites").value = c ? c.sites : 1;
        $("#cf-contact").value = c ? c.contact : "";
        $("#cf-email").value = c ? c.email : "";
        $("#cf-phone").value = c ? c.phone : "";
        $("#cf-address").value = c ? c.site : "";
        $("#cf-postcode").value = "";
        $("#cf-notes").value = "";
        $$("#client-form .err-msg").forEach(function(m){ m.classList.remove("show"); });
        $$("#client-form .input").forEach(function(i){ i.classList.remove("err"); });
        go("view-client-form");
      }
      $("#client-form").addEventListener("submit", function(e){
        e.preventDefault();
        var company = $("#cf-company"), email = $("#cf-email"), ok = true;
        var companyOk = company.value.trim().length > 1;
        company.classList.toggle("err", !companyOk); $("#err-cf-company").classList.toggle("show", !companyOk); if(!companyOk) ok = false;
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
        email.classList.toggle("err", !emailOk); $("#err-cf-email").classList.toggle("show", !emailOk); if(!emailOk) ok = false;
        if(!ok) return;
        var addr = $("#cf-address").value.trim();
        var pc = $("#cf-postcode").value.trim().toUpperCase();
        var site = addr ? (addr + (pc ? ", " + pc : "")) : "Address to be confirmed";
        if(editingClientId){
          var c = clientById(editingClientId);
          c.name = company.value.trim(); c.sector = $("#cf-sector").value; c.sites = parseInt($("#cf-sites").value,10) || 1;
          c.contact = $("#cf-contact").value.trim() || "To be confirmed"; c.email = email.value.trim();
          c.phone = $("#cf-phone").value.trim() || "\u2014"; c.site = site;
          var townMatch = addr.split(",").pop(); c.town = townMatch ? townMatch.trim().replace(/\s[A-Z]{1,2}\d.*$/, "") || c.town : c.town;
          toast("Client details updated.");
          renderClients(); openClient(c.id);
        } else {
          var nc = { id:"c" + Date.now(), name:company.value.trim(), sector:$("#cf-sector").value,
            town:(addr.split(",").pop() || "UK").trim(), contact:$("#cf-contact").value.trim() || "To be confirmed",
            email:email.value.trim(), phone:$("#cf-phone").value.trim() || "\u2014", site:site,
            since:"Oct 2026", sites:parseInt($("#cf-sites").value,10) || 1, open:0 };
          CLIENTS.unshift(nc);
          toast("Client added to your directory.");
          renderClients(); openClient(nc.id);
        }
      });

      /* ================= Assessments ================= */
      var assessFilter = "All";
      function renderAssessments(){
        var list = ASSESSMENTS.filter(function(a){ return assessFilter === "All" || a.status === assessFilter; });
        $("#assessment-list").innerHTML = list.map(function(a){
          var c = clientById(a.clientId); var w = worstRisk(a.hazards);
          return '<button class="row-item" data-assessment="' + a.id + '">' +
            '<span class="r-main"><b>' + esc(a.title) + '</b><span>' + a.ref + " \u00B7 " + esc(c.name) + " \u00B7 " + fmtDate(a.date) + '</span></span>' +
            '<span class="r-side"><span class="chip ' + w.chip + '">' + w.label + " risk</span>" + statusChip(a.status) + '</span>' +
            '<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>';
        }).join("");
        $("#assessment-empty").hidden = list.length > 0;
        $("#assessment-list").style.display = list.length ? "" : "none";
      }
      $("#assess-filters").addEventListener("click", function(e){
        var b = e.target.closest("[data-filter]"); if(!b) return;
        $$("#assess-filters .fchip").forEach(function(c){ c.classList.remove("on"); });
        b.classList.add("on"); assessFilter = b.getAttribute("data-filter"); renderAssessments();
      });

      var activeAssessmentId = "a2";
      function openAssessment(id){
        activeAssessmentId = id;
        var a = ASSESSMENTS.filter(function(x){ return x.id === id; })[0]; if(!a) return;
        var c = clientById(a.clientId); var w = worstRisk(a.hazards);
        $("#ad-ref").textContent = a.ref;
        var st = $("#ad-status"); st.textContent = a.status;
        st.className = "chip " + (a.status === "Completed" ? "green" : (a.status === "In Progress" ? "amber" : "grey"));
        $("#ad-date").textContent = "Assessed " + fmtDate(a.date) + " \u00B7 review " + fmtDate(a.review);
        $("#ad-title").textContent = a.title;
        $("#ad-client-line").textContent = c.name + " \u00B7 " + a.site;
        var rb = $("#ad-rating"); rb.className = "rating-box " + w.band;
        $("#ad-score").textContent = w.score + " / 25";
        $("#ad-hz-count").textContent = a.hazards.length + (a.hazards.length === 1 ? " hazard" : " hazards");
        $("#ad-hazards").innerHTML = a.hazards.map(function(h){
          var r = riskOf(h.l, h.s);
          return '<div class="finding"><div class="f-top"><b>' + esc(h.name) + '</b><span class="chip ' + r.chip + '">' + r.label + " \u00B7 " + r.score + '</span></div>' +
            '<p><strong>People at risk:</strong> ' + esc(h.people) + '</p>' +
            '<p><strong>Existing controls:</strong> ' + esc(h.controls) + '</p>' +
            '<p style="font-size:12px;color:var(--ink-500);">Likelihood ' + h.l + " (" + L_WORDS[h.l] + ") \u00D7 severity " + h.s + " (" + S_WORDS[h.s] + ')</p>' +
            '<div class="rec"><b>Recommended action</b><br />' + esc(h.action) + '</div></div>';
        }).join("");
        $("#ad-photos").innerHTML = a.photos.map(function(p){ return '<img src="' + p + '" alt="Site photograph attached to ' + esc(a.ref) + '" />'; }).join("");
        $("#ad-notes").textContent = a.notes || "No additional notes recorded.";
        $("#ad-complete").style.display = a.status === "Completed" ? "none" : "";
        $("#ad-report").style.display = a.status === "Completed" ? "" : "none";
        go("view-assessment-detail");
      }
      $("#ad-edit").addEventListener("click", function(){ openAssessmentForm(activeAssessmentId); });
      $("#ad-complete").addEventListener("click", function(){
        var a = ASSESSMENTS.filter(function(x){ return x.id === activeAssessmentId; })[0];
        a.status = "Completed"; renderAssessments(); openAssessment(a.id);
        toast("Assessment " + a.ref + " marked complete.");
      });
      $("#ad-report").addEventListener("click", function(){
        var a = ASSESSMENTS.filter(function(x){ return x.id === activeAssessmentId; })[0];
        var rep = { id:"r-gen-" + a.id, ref:"RPT-" + (2045 + ASSESSMENTS.indexOf(a)), title:a.title + " \u2014 Assessment Report", clientId:a.clientId,
          site:a.site, date:a.date, status:"Draft", type:"Assessment", summary:a.notes,
          findings:a.hazards.map(function(h){ return {title:h.name, l:h.l, s:h.s, text:"People at risk: " + h.people + ". Existing controls: " + h.controls + ".", rec:h.action}; }) };
        if(!REPORTS.some(function(r){ return r.id === rep.id; })) REPORTS.unshift(rep);
        renderReports(); updateReportsBadge(); openReport(rep.id);
        toast("Report draft created from " + a.ref + ".");
      });

      /* ---- Assessment form ---- */
      var editingAssessmentId = null;
      var afPhotos = [];
      var PHOTO_POOL = [IMGDATA("img1"),IMGDATA("img2"),IMGDATA("img0"),IMGDATA("img1")];
      function matrixHTML(l, s){
        var cells = "";
        for(var li = 5; li >= 1; li--){
          for(var si = 1; si <= 5; si++){
            var sc = li * si;
            var col = sc >= 17 ? "#c62f3b" : (sc >= 10 ? "#e07b24" : (sc >= 5 ? "#e8a13a" : "#3fae6a"));
            cells += '<i style="background:' + col + '" class="' + (li === l && si === s ? "on" : "") + '"></i>';
          }
        }
        return '<div class="matrix" aria-hidden="true">' + cells + "</div>";
      }
      function hazardRowHTML(h){
        h = h || {name:"", people:"", controls:"", l:3, s:3, action:""};
        var r = riskOf(h.l, h.s);
        var opts = function(sel, words){ var o = ""; for(var i = 1; i <= 5; i++) o += '<option value="' + i + '"' + (i === sel ? " selected" : "") + ">" + i + " \u2014 " + words[i] + "</option>"; return o; };
        return '<div class="haz-top"><b>Hazard</b><button type="button" class="rm">Remove</button></div>' +
          '<div class="field"><label>Identified hazard *</label><input class="input hz-name" placeholder="e.g. Blocked fire exit in the assembly area" value="' + esc(h.name) + '" /></div>' +
          '<div class="field"><label>People at risk</label><input class="input hz-people" placeholder="e.g. Staff, students, visitors and contractors" value="' + esc(h.people) + '" /></div>' +
          '<div class="field"><label>Existing control measures</label><textarea class="input hz-controls" placeholder="What is already in place?">' + esc(h.controls) + '</textarea></div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
            '<div class="field"><label>Likelihood (1\u20135)</label><select class="input hz-l">' + opts(h.l, L_WORDS) + '</select></div>' +
            '<div class="field"><label>Severity (1\u20135)</label><select class="input hz-s">' + opts(h.s, S_WORDS) + '</select></div>' +
          '</div>' +
          '<div class="rating-box ' + r.band + '"><span class="score">' + r.score + '</span><span>Risk rating: <strong>' + r.label + '</strong> (likelihood \u00D7 severity)</span></div>' +
          matrixHTML(h.l, h.s) +
          '<div class="field" style="margin-top:10px;"><label>Recommended actions</label><textarea class="input hz-action" placeholder="What should be done, by whom and by when?">' + esc(h.action) + "</textarea></div>";
      }
      function refreshHazardRating(row){
        var l = parseInt($(".hz-l", row).value, 10), s = parseInt($(".hz-s", row).value, 10);
        var r = riskOf(l, s);
        var box = $(".rating-box", row);
        box.className = "rating-box " + r.band;
        box.innerHTML = '<span class="score">' + r.score + '</span><span>Risk rating: <strong>' + r.label + '</strong> (likelihood \u00D7 severity)</span>';
        var m = $(".matrix", row); if(m) m.outerHTML = matrixHTML(l, s);
      }
      function addHazardRow(h){
        var div = document.createElement("div");
        div.className = "hazard";
        div.innerHTML = hazardRowHTML(h);
        $("#af-hazards").appendChild(div);
        return div;
      }
      $("#af-hazards").addEventListener("change", function(e){ var row = e.target.closest(".hazard"); if(row) refreshHazardRating(row); });
      $("#af-hazards").addEventListener("click", function(e){
        if(e.target.classList.contains("rm")){
          var rows = $$("#af-hazards .hazard");
          if(rows.length > 1){ e.target.closest(".hazard").remove(); }
          else toast("An assessment needs at least one hazard.");
        }
      });
      $("#af-add-hazard").addEventListener("click", function(){
        var row = addHazardRow();
        var inp = $(".hz-name", row); if(inp) inp.focus();
        row.scrollIntoView({behavior:"smooth", block:"center"});
      });
      function renderAfPhotos(){
        var wrap = $("#af-photos");
        $$("img", wrap).forEach(function(i){ i.remove(); });
        var add = $("#af-add-photo");
        afPhotos.forEach(function(p){
          var img = document.createElement("img");
          img.src = p; img.alt = "Site photograph attached to this assessment";
          wrap.insertBefore(img, add);
        });
      }
      $("#af-add-photo").addEventListener("click", function(){
        if(afPhotos.length >= 4){ toast("Up to four photos in this demo."); return; }
        afPhotos.push(PHOTO_POOL[afPhotos.length % PHOTO_POOL.length]);
        renderAfPhotos();
        toast("Photo attached (sample image).");
      });
      function fillClientSelect(sel, selected){
        sel.innerHTML = CLIENTS.map(function(c){ return '<option value="' + c.id + '"' + (c.id === selected ? " selected" : "") + ">" + esc(c.name) + "</option>"; }).join("");
      }
      function openAssessmentForm(id, presetClient){
        editingAssessmentId = id || null;
        $("#af-title").textContent = id ? "Edit risk assessment" : "New risk assessment";
        var a = id ? ASSESSMENTS.filter(function(x){ return x.id === id; })[0] : null;
        fillClientSelect($("#af-client"), a ? a.clientId : (presetClient || CLIENTS[0].id));
        $("#af-site").value = a ? a.site : "";
        $("#af-date").value = isoToUk(a ? a.date : "2026-10-16");
        $("#af-review").value = isoToUk(a ? a.review : "2027-10-16");
        $("#af-notes").value = a ? a.notes : "";
        $("#af-hazards").innerHTML = "";
        if(a) a.hazards.forEach(function(h){ addHazardRow(h); }); else addHazardRow();
        afPhotos = a ? a.photos.slice() : [];
        renderAfPhotos();
        $$("#assessment-form .err-msg").forEach(function(m){ m.classList.remove("show"); });
        go("view-assessment-form");
      }
      $("#assessment-form").addEventListener("submit", function(e){
        e.preventDefault();
        var saveAs = (document.activeElement && document.activeElement.getAttribute("data-saveas")) || "Draft";
        var ok = true;
        var siteOk = $("#af-site").value.trim().length > 2;
        $("#af-site").classList.toggle("err", !siteOk); $("#err-af-site").classList.toggle("show", !siteOk); if(!siteOk) ok = false;
        var dateIso = $("#af-date").value.trim() ? parseUkDate($("#af-date").value) : "2026-10-16";
        var dateOk = !!dateIso;
        $("#af-date").classList.toggle("err", !dateOk); $("#err-af-date").classList.toggle("show", !dateOk); if(!dateOk) ok = false;
        var reviewIso = $("#af-review").value.trim() ? parseUkDate($("#af-review").value) : "2027-10-16";
        var reviewOk = !!reviewIso && (!dateIso || reviewIso >= dateIso);
        $("#af-review").classList.toggle("err", !reviewOk);
        $("#err-af-review").textContent = (reviewIso && dateIso && reviewIso < dateIso)
          ? "Review date must be on or after the assessment date."
          : "Enter the date as DD/MM/YYYY, e.g. 16/10/2027.";
        $("#err-af-review").classList.toggle("show", !reviewOk); if(!reviewOk) ok = false;
        var rows = $$("#af-hazards .hazard");
        var hazards = rows.map(function(row){
          return { name:$(".hz-name", row).value.trim(), people:$(".hz-people", row).value.trim(),
            controls:$(".hz-controls", row).value.trim(), l:parseInt($(".hz-l", row).value,10), s:parseInt($(".hz-s", row).value,10),
            action:$(".hz-action", row).value.trim() };
        }).filter(function(h){ return h.name; });
        if(!hazards.length){ ok = false; toast("Add at least one hazard before saving."); }
        if(!ok) return;
        if(editingAssessmentId){
          var a = ASSESSMENTS.filter(function(x){ return x.id === editingAssessmentId; })[0];
          a.site = $("#af-site").value.trim(); a.clientId = $("#af-client").value; a.date = dateIso;
          a.review = reviewIso; a.notes = $("#af-notes").value.trim(); a.hazards = hazards;
          a.photos = afPhotos.slice(); if(saveAs === "Completed") a.status = "Completed";
          renderAssessments(); openAssessment(a.id);
          toast("Assessment " + a.ref + " saved.");
        } else {
          var na = { id:"a" + Date.now(), ref:"RA-" + (123 + ASSESSMENTS.length), title:$("#af-site").value.trim().split(",")[0] + " assessment",
            clientId:$("#af-client").value, site:$("#af-site").value.trim(), date:dateIso,
            review:reviewIso, status:saveAs === "Completed" ? "Completed" : "Draft",
            notes:$("#af-notes").value.trim(), photos:afPhotos.slice(), hazards:hazards };
          ASSESSMENTS.unshift(na);
          renderAssessments(); openAssessment(na.id);
          toast(saveAs === "Completed" ? "Assessment completed and saved." : "Draft saved \u2014 you can finish it later.");
        }
      });

      /* ================= Inspections ================= */
      function renderInspections(){
        $("#inspection-list").innerHTML = INSPECTIONS.map(function(ins){
          var c = clientById(ins.clientId);
          var pct = ins.total ? Math.round(ins.checked / ins.total * 100) : 0;
          return '<button class="row-item" data-inspection="' + ins.id + '" style="align-items:flex-start;">' +
            '<span class="r-main"><b>' + esc(ins.title) + '</b><span>' + esc(c.name) + " \u00B7 " + fmtDate(ins.date) + " \u00B7 " + esc(ins.time) + '</span>' +
            '<span style="display:block;margin-top:9px;"><span class="progress" style="display:block;"><i style="width:' + pct + '%"></i></span>' +
            '<span style="font-size:11.5px;color:var(--ink-500);font-weight:700;display:block;margin-top:5px;">' + ins.checked + " of " + ins.total + " checks complete</span></span></span>" +
            '<span class="r-side">' + statusChip(ins.status) + (ins.fails > 0 ? '<span class="chip red">' + ins.fails + (ins.fails === 1 ? " issue" : " issues") + "</span>" : "") + "</span></button>";
        }).join("");
      }
      $("#inspection-form").addEventListener("submit", function(e){
        e.preventDefault();
        var clientOk = !!$("#if-client").value;
        $("#err-if-client").classList.toggle("show", !clientOk);
        if(!clientOk) return;
        var dateIso = $("#if-date").value.trim() ? parseUkDate($("#if-date").value) : "2026-10-20";
        $("#if-date").classList.toggle("err", !dateIso); $("#err-if-date").classList.toggle("show", !dateIso);
        if(!dateIso) return;
        var ni = { id:"i" + Date.now(), title:$("#if-type").value, clientId:$("#if-client").value,
          site:$("#if-site").value.trim() || "Main site", date:dateIso,
          time:$("#if-time").value || "10:00", status:"Scheduled", checked:0, total:9, fails:0 };
        INSPECTIONS.unshift(ni);
        renderInspections();
        back();
        toast("Inspection booked for " + fmtDate(ni.date) + " at " + ni.time + ".");
      });

      /* ---- Checklist ---- */
      var activeInspectionId = "i1";
      function renderChecklist(){
        var ins = INSPECTIONS.filter(function(x){ return x.id === activeInspectionId; })[0];
        var c = clientById(ins.clientId);
        $("#id-title").textContent = ins.title;
        $("#id-meta").textContent = c.name + " \u00B7 " + ins.site + " \u00B7 " + fmtDate(ins.date) + ", " + ins.time;
        var st = $("#id-status"); st.textContent = ins.status;
        st.className = "chip " + (ins.status === "Completed" ? "green" : (ins.status === "In progress" ? "amber" : "navy"));
        var html = "", total = 0, done = 0, np = 0, nf = 0, nn = 0;
        CHECKLIST.forEach(function(g, gi){
          html += '<div class="card check-group"><h3>' + esc(g.group) + '</h3><div class="g-sub">' + esc(g.sub) + "</div>";
          g.items.forEach(function(item, ii){
            total++;
            var key = gi + "-" + ii;
            var stt = checklistState[key];
            if(stt && stt.state){ done++; if(stt.state === "pass") np++; if(stt.state === "fail") nf++; if(stt.state === "na") nn++; }
            html += '<div class="check-item"><div class="q">' + esc(item.q) + "<small>" + esc(item.d) + '</small></div>' +
              '<div class="pfn" role="group" aria-label="Result for: ' + esc(item.q) + '">' +
              '<button data-pfn="' + key + '" data-val="pass" class="' + (stt && stt.state === "pass" ? "on-pass" : "") + '">Pass</button>' +
              '<button data-pfn="' + key + '" data-val="fail" class="' + (stt && stt.state === "fail" ? "on-fail" : "") + '">Fail</button>' +
              '<button data-pfn="' + key + '" data-val="na" class="' + (stt && stt.state === "na" ? "on-na" : "") + '">N/A</button></div>' +
              '<div class="check-note' + (stt && stt.state === "fail" ? " show" : "") + '"><textarea class="input" data-note="' + key + '" placeholder="Observation and corrective action, with a follow-up date\u2026">' + esc(stt ? stt.note : "") + "</textarea></div></div>";
          });
          html += "</div>";
        });
        $("#id-groups").innerHTML = html;
        ins.checked = done; ins.total = total; ins.fails = nf;
        $("#id-progress-txt").textContent = done + " of " + total + " checked";
        $("#id-progress-bar").style.width = (total ? Math.round(done / total * 100) : 0) + "%";
        $("#id-n-pass").textContent = np; $("#id-n-fail").textContent = nf; $("#id-n-na").textContent = nn;
        var complete = $("#id-complete");
        if(ins.status === "Completed"){
          complete.disabled = true; complete.textContent = "Inspection completed";
          $("#id-complete-hint").textContent = "This inspection is complete. A draft report is available in Reports.";
        } else {
          complete.disabled = done < total;
          complete.textContent = "Complete inspection";
          $("#id-complete-hint").textContent = done < total ? ("Answer every checklist item to complete the inspection (" + (total - done) + " remaining).") : "All items answered \u2014 ready to complete.";
        }
        renderInspections();
      }
      function openInspection(id){ activeInspectionId = id; renderChecklist(); go("view-inspection-detail"); }
      $("#id-groups").addEventListener("click", function(e){
        var b = e.target.closest("[data-pfn]"); if(!b) return;
        var key = b.getAttribute("data-pfn");
        checklistState[key] = checklistState[key] || {state:"", note:""};
        checklistState[key].state = b.getAttribute("data-val");
        var item = b.closest(".check-item");
        $$("[data-pfn]", item).forEach(function(x){ x.className = ""; });
        b.className = b.getAttribute("data-val") === "pass" ? "on-pass" : (b.getAttribute("data-val") === "fail" ? "on-fail" : "on-na");
        var note = $(".check-note", item);
        if(note) note.classList.toggle("show", b.getAttribute("data-val") === "fail");
        var ins = INSPECTIONS.filter(function(x){ return x.id === activeInspectionId; })[0];
        if(ins.status === "Scheduled") ins.status = "In progress";
        renderChecklist();
      });
      $("#id-groups").addEventListener("input", function(e){
        var t = e.target.closest("[data-note]"); if(!t) return;
        var key = t.getAttribute("data-note");
        checklistState[key] = checklistState[key] || {state:"fail", note:""};
        checklistState[key].note = t.value;
      });
      var idPhotoCount = 2;
      $("#id-add-photo").addEventListener("click", function(){
        if(idPhotoCount >= 4){ toast("Up to four photos in this demo."); return; }
        var img = document.createElement("img");
        img.src = PHOTO_POOL[idPhotoCount % PHOTO_POOL.length];
        img.alt = "Additional site photograph taken during the inspection";
        $("#id-photos").insertBefore(img, this);
        idPhotoCount++;
        toast("Photo attached (sample image).");
      });
      $("#id-complete").addEventListener("click", function(){
        openModal(
          '<span class="m-ic" style="background:var(--green-50);color:var(--green-600);"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg></span>' +
          "<h3>Complete this inspection?</h3>" +
          "<p>The checklist will be locked, failed items become follow-up tasks, and a draft report is created in Reports for you to review.</p>" +
          '<div class="m-actions"><button class="btn btn-green" id="m-confirm-complete">Complete inspection</button><button class="btn btn-ghost" id="m-cancel">Keep editing</button></div>'
        );
        $("#m-cancel").addEventListener("click", closeOverlays);
        $("#m-confirm-complete").addEventListener("click", function(){
          var ins = INSPECTIONS.filter(function(x){ return x.id === activeInspectionId; })[0];
          ins.status = "Completed";
          var rep = { id:"r-insp-" + ins.id, ref:"RPT-" + (2046 + INSPECTIONS.indexOf(ins)), title:ins.title + " \u2014 Inspection Report",
            clientId:ins.clientId, site:ins.site, date:ins.date, status:"Draft", type:"Inspection",
            summary:"Inspection completed on " + fmtDate(ins.date) + " at " + ins.site + ". " + ins.fails + (ins.fails === 1 ? " item requires" : " items require") + " corrective action; see the findings below.",
            findings:[{title:"Checklist outcome", l:3, s:3, text:"Of " + ins.total + " checklist items, " + ins.fails + " failed and the remainder passed or were not applicable. Observations were recorded against each failed item.", rec:"Complete the corrective actions by the agreed follow-up dates and evidence closure with photographs."}] };
          if(!REPORTS.some(function(r){ return r.id === rep.id; })) REPORTS.unshift(rep);
          closeOverlays(); renderChecklist(); renderReports(); updateReportsBadge();
          toast("Inspection complete \u2014 draft report " + rep.ref + " created.");
        });
      });

      /* ================= Reports ================= */
      var reportFilter = "All";
      function renderReports(){
        var list = REPORTS.filter(function(r){ return reportFilter === "All" || r.status === reportFilter; });
        $("#report-list").innerHTML = list.length ? list.map(function(r){
          var c = clientById(r.clientId);
          return '<button class="row-item" data-report="' + r.id + '">' +
            '<span class="r-main"><b>' + esc(r.title) + '</b><span>' + r.ref + " \u00B7 " + esc(c.name) + " \u00B7 " + fmtDate(r.date) + '</span></span>' +
            '<span class="r-side">' + statusChip(r.status) + '</span>' +
            '<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>';
        }).join("") : '<div class="empty"><span class="e-ic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></span><h4>No reports with this status</h4><p>Reports you create from assessments and inspections will appear here.</p></div>';
      }
      function updateReportsBadge(){
        var n = REPORTS.filter(function(r){ return r.status !== "Completed"; }).length;
        var b = $("#reports-badge"); b.textContent = n; b.style.display = n ? "" : "none";
      }
      $("#report-filters").addEventListener("click", function(e){
        var b = e.target.closest("[data-filter]"); if(!b) return;
        $$("#report-filters .fchip").forEach(function(c){ c.classList.remove("on"); });
        b.classList.add("on"); reportFilter = b.getAttribute("data-filter"); renderReports();
      });

      var activeReportId = "r1";
      function openReport(id){
        var r = REPORTS.filter(function(x){ return x.id === id; })[0]; if(!r) return;
        activeReportId = id;
        var c = clientById(r.clientId);
        var st = $("#rp-status"); st.textContent = r.status;
        st.className = "chip " + (r.status === "Completed" ? "green" : (r.status === "In Review" ? "amber" : "grey"));
        $("#rp-ref").textContent = "Report " + r.ref + " \u00B7 " + r.type;
        $("#rp-ref2").textContent = r.ref;
        $("#rp-title").textContent = r.title;
        $("#rp-client").textContent = "Prepared for " + c.name;
        $("#rp-site").textContent = r.site;
        $("#rp-date").textContent = fmtDate(r.date);
        $("#rp-summary").textContent = r.summary;
        $("#rp-findings").innerHTML = r.findings.map(function(f){
          var rk = riskOf(f.l, f.s);
          return '<div class="finding"><div class="f-top"><b>' + esc(f.title) + '</b><span class="chip ' + rk.chip + '">' + rk.label + " \u00B7 " + rk.score + '</span></div>' +
            "<p>" + esc(f.text) + '</p><div class="rec"><b>Recommended action</b><br />' + esc(f.rec) + "</div></div>";
        }).join("");
        go("view-report-preview");
      }
      function reportById(id){ return REPORTS.filter(function(x){ return x.id === id; })[0]; }
      $("#rp-status-btn").addEventListener("click", function(){
        var r = reportById(activeReportId);
        var opts = ["Draft","In Review","Completed"].map(function(s){
          return '<button class="share-opt" data-set-status="' + s + '"><span class="o-ic" style="background:var(--navy-50);color:var(--navy-700);"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></span><span><b>' + s + (s === r.status ? " (current)" : "") + "</b><span>" + (s === "Draft" ? "Still being written \u2014 only visible to you" : (s === "In Review" ? "Ready for a final check before issuing" : "Final version, ready to export and share")) + "</span></span></button>";
        }).join("");
        openSheet("<h3>Report status</h3><p class=\"s-sub\">Move " + r.ref + " through your review workflow.</p>" + opts);
        $$("#sheet [data-set-status]").forEach(function(b){
          b.addEventListener("click", function(){
            r.status = b.getAttribute("data-set-status");
            closeOverlays(); renderReports(); updateReportsBadge(); openReport(r.id);
            toast("Report " + r.ref + " is now \u201C" + r.status + "\u201D.");
          });
        });
      });
      $("#rp-export").addEventListener("click", function(){
        var r = reportById(activeReportId);
        openSheet(
          "<h3>Export PDF</h3><p class=\"s-sub\">Preparing " + r.ref + " with your company branding, ready to send to " + esc(clientById(r.clientId).name) + ".</p>" +
          '<div class="progress" style="margin:6px 0 10px;"><i id="exp-bar" style="width:4%"></i></div>' +
          '<p id="exp-label" style="font-size:13px;color:var(--ink-500);font-weight:600;margin:0 0 16px;">Building document\u2026</p>' +
          '<button class="btn btn-primary btn-block" id="exp-download" disabled>Download PDF</button>'
        );
        var pct = 4;
        var iv = setInterval(function(){
          pct += 16 + Math.random() * 10;
          if(pct >= 100){ pct = 100; clearInterval(iv);
            $("#exp-label").textContent = "Ready \u2014 " + r.ref + ".pdf (sample export, 6 pages)";
            var dl = $("#exp-download"); dl.disabled = false;
            dl.addEventListener("click", function(){ closeOverlays(); toast("PDF downloaded (demonstration export)."); });
          }
          var bar = $("#exp-bar"); if(bar) bar.style.width = pct + "%";
          var lab = $("#exp-label"); if(lab && pct < 100) lab.textContent = pct < 55 ? "Building document\u2026" : "Applying branding and page numbers\u2026";
          if(!document.body.contains(bar)) clearInterval(iv);
        }, 260);
      });
      $("#rp-share").addEventListener("click", function(){
        var r = reportById(activeReportId);
        var link = "https://app.assurepoint.co.uk/reports/" + r.ref.toLowerCase();
        openSheet(
          "<h3>Share report</h3><p class=\"s-sub\">Send " + r.ref + " to " + esc(clientById(r.clientId).name) + ". Links expire after 30 days in the live app.</p>" +
          '<div class="field"><label>Shareable link</label><input class="input" id="share-link" readonly value="' + link + '" /></div>' +
          '<button class="share-opt" id="share-copy"><span class="o-ic" style="background:var(--navy-50);color:var(--navy-700);"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></span><span><b>Copy link</b><span>Paste it into an email or message</span></span></button>' +
          '<button class="share-opt" id="share-email"><span class="o-ic" style="background:var(--green-50);color:var(--green-600);"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg></span><span><b>Email to client</b><span>To ' + esc(clientById(r.clientId).contact) + ", " + esc(clientById(r.clientId).email) + "</span></span></button>"
        );
        $("#share-copy").addEventListener("click", function(){
          var input = $("#share-link"); input.select();
          var done = function(){ closeOverlays(); toast("Link copied \u2014 ready to paste."); };
          if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(input.value).then(done, done); }
          else { try{ document.execCommand("copy"); }catch(e){} done(); }
        });
        $("#share-email").addEventListener("click", function(){ closeOverlays(); toast("Report email prepared for " + clientById(r.clientId).contact + " (demo)."); });
      });
      function createReportSheet(){
        var sources = ASSESSMENTS.filter(function(a){ return a.status === "Completed"; }).map(function(a){
          return {kind:"Assessment", ref:a.ref, title:a.title, clientId:a.clientId, nav:"view-assessment-detail", id:a.id};
        }).concat(INSPECTIONS.filter(function(i){ return i.status === "Completed"; }).map(function(i){
          return {kind:"Inspection", ref:i.title, title:i.site, clientId:i.clientId, nav:"view-inspection-detail", id:i.id};
        }));
        openSheet("<h3>Create report</h3><p class=\"s-sub\">Generate a branded report from a completed assessment or inspection.</p>" +
          (sources.length ? sources.map(function(s){
            return '<button class="share-opt" data-src-kind="' + s.kind + '" data-src-id="' + s.id + '"><span class="o-ic" style="background:var(--navy-50);color:var(--navy-700);"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></span><span><b>' + esc(s.title) + '</b><span>' + s.kind + " \u00B7 " + esc(clientById(s.clientId).name) + "</span></span></button>";
          }).join("") : '<div class="empty"><h4>Nothing ready yet</h4><p>Complete an assessment or inspection first, then generate its report.</p></div>'));
        $$("#sheet [data-src-id]").forEach(function(b){
          b.addEventListener("click", function(){
            closeOverlays();
            if(b.getAttribute("data-src-kind") === "Assessment"){ openAssessment(b.getAttribute("data-src-id")); toast("Open the assessment, then tap \u201CGenerate report\u201D."); }
            else { openInspection(b.getAttribute("data-src-id")); toast("This inspection already has a draft in Reports."); }
          });
        });
      }
      $("#quick-report").addEventListener("click", createReportSheet);
      $("#reports-new").addEventListener("click", createReportSheet);

      /* ================= Calendar & tasks ================= */
      var calDay = 16, calMode = "day";
      function renderCalStrip(){
        $("#cal-strip").innerHTML = WEEK.map(function(w){
          return '<button class="cal-day' + (w.day === calDay ? " sel" : "") + (w.today ? " today" : "") + '" data-day="' + w.day + '"><span>' + w.dow + "</span><b>" + w.day + "</b>" + ((EVENTS[w.day] || []).length ? '<span class="cdot"></span>' : '<span class="cdot" style="background:transparent;"></span>') + "</button>";
        }).join("");
      }
      var TYPE_COLORS = {insp:"#17a35a", assess:"#e8a13a", report:"#1c4b9c", meet:"#7a3b06"};
      function eventRow(ev){
        return '<button class="appt" data-nav="' + ev.nav + '" style="border-top:1px solid var(--line);"><span class="ev-dot" style="background:' + (TYPE_COLORS[ev.type] || "#98a2b3") + '"></span><span class="what"><b>' + esc(ev.title) + '</b><span>' + esc(ev.where) + '</span></span><span class="time">' + ev.time + "</span></button>";
      }
      function renderCalEvents(){
        var wrap = $("#cal-events");
        if(calMode === "day"){
          var evs = EVENTS[calDay] || [];
          var label = calDay === 16 ? "Today, Fri 16 Oct" : WEEK.filter(function(w){ return w.day === calDay; })[0].dow + " " + calDay + " Oct";
          wrap.innerHTML = '<div class="section-head" style="margin-top:4px;"><h3>' + label + '</h3><span style="font-size:12.5px;color:var(--ink-500);font-weight:700;">' + evs.length + (evs.length === 1 ? " event" : " events") + '</span></div>' +
            (evs.length ? '<div class="card" style="padding:4px 0;">' + evs.map(eventRow).join("") + "</div>"
              : '<div class="card empty"><span class="e-ic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg></span><h4>No visits scheduled</h4><p>A clear day \u2014 a good time to clear report reviews and follow-up calls.</p></div>');
        } else {
          var html = "";
          WEEK.forEach(function(w){
            var evs = EVENTS[w.day] || [];
            html += '<div class="section-head" style="margin-top:16px;"><h3>' + w.dow + " " + w.day + " Oct" + (w.today ? " \u00B7 today" : "") + '</h3><span style="font-size:12.5px;color:var(--ink-500);font-weight:700;">' + evs.length + (evs.length === 1 ? " event" : " events") + "</span></div>";
            html += evs.length ? '<div class="card" style="padding:4px 0;">' + evs.map(eventRow).join("") + "</div>"
              : '<div class="card" style="padding:13px 16px;font-size:13px;color:var(--ink-500);">No visits scheduled.</div>';
          });
          wrap.innerHTML = html;
        }
      }
      $("#cal-strip").addEventListener("click", function(e){
        var b = e.target.closest("[data-day]"); if(!b) return;
        calDay = parseInt(b.getAttribute("data-day"), 10); calMode = "day";
        $("#cal-view-day").classList.add("on"); $("#cal-view-week").classList.remove("on");
        renderCalStrip(); renderCalEvents();
      });
      $("#cal-view-day").addEventListener("click", function(){ calMode = "day"; this.classList.add("on"); $("#cal-view-week").classList.remove("on"); renderCalEvents(); });
      $("#cal-view-week").addEventListener("click", function(){ calMode = "week"; this.classList.add("on"); $("#cal-view-day").classList.remove("on"); renderCalEvents(); });
      function setCalTab(which){
        var tasks = which === "tasks";
        $("#cal-tab-schedule").classList.toggle("on", !tasks);
        $("#cal-tab-tasks").classList.toggle("on", tasks);
        $("#cal-tab-schedule").setAttribute("aria-selected", String(!tasks));
        $("#cal-tab-tasks").setAttribute("aria-selected", String(tasks));
        $("#cal-pane-schedule").hidden = tasks;
        $("#cal-pane-tasks").hidden = !tasks;
      }
      $("#cal-tab-schedule").addEventListener("click", function(){ setCalTab("schedule"); });
      $("#cal-tab-tasks").addEventListener("click", function(){ setCalTab("tasks"); });

      function taskRowHTML(t){
        return '<button class="task-row' + (t.done ? " done" : "") + '" data-task="' + t.id + '">' +
          '<span class="tick">' + (t.done ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : "") + "</span>" +
          '<span class="t-main"><b>' + esc(t.title) + '</b><span>' + esc(t.client) + "</span></span>" +
          '<span class="chip ' + (t.done ? "green" : (t.overdue ? "red" : "amber")) + '" style="flex:none;">' + esc(t.due) + "</span></button>";
      }
      function renderTasks(){
        var open = TASKS.filter(function(t){ return !t.done; });
        var done = TASKS.filter(function(t){ return t.done; });
        $("#task-list").innerHTML = open.length ? open.map(taskRowHTML).join("") : '<div class="empty"><h4>All caught up</h4><p>No outstanding corrective actions. New ones appear when inspections raise them.</p></div>';
        $("#task-done-list").innerHTML = done.length ? done.map(taskRowHTML).join("") : '<div style="padding:14px 16px;font-size:13px;color:var(--ink-500);">Nothing completed yet this week.</div>';
        $("#dash-tasks").innerHTML = open.slice(0, 4).map(taskRowHTML).join("");
        $("#task-count-chip").textContent = open.length + " open";
        var overdue = open.filter(function(t){ return t.overdue; }).length;
        var head = $("#attention-card b");
        if(head) head.textContent = open.length + " actions need your attention";
        var sub = $("#attention-card .card-sub");
        if(sub) sub.textContent = overdue + " corrective actions are overdue. Tap to open your task list.";
      }
      document.addEventListener("click", function(e){
        var row = e.target.closest("[data-task]");
        if(row){
          var t = TASKS.filter(function(x){ return x.id === row.getAttribute("data-task"); })[0];
          if(t){ t.done = !t.done; if(t.done) t.due = "Completed today"; renderTasks(); toast(t.done ? "Task marked complete." : "Task reopened."); }
        }
      });

      /* ================= Profile ================= */
      $$(".switch").forEach(function(sw){
        sw.addEventListener("click", function(){
          var on = sw.getAttribute("aria-checked") === "true";
          sw.setAttribute("aria-checked", String(!on));
          if(sw.id === "set-logo"){
            var head = $("#rp-head > div");
            if(head) head.style.display = !on ? "" : "none";
            toast(!on ? "Your logo will appear on exported reports." : "Logo hidden on reports.");
          }
        });
      });
      $("#report-swatches").addEventListener("click", function(e){
        var b = e.target.closest("[data-accent]"); if(!b) return;
        $$("#report-swatches .swatch").forEach(function(s){ s.classList.remove("on"); });
        b.classList.add("on");
        $("#rp-head").style.background = b.getAttribute("data-accent");
        toast("Report accent colour updated.");
      });
      $("#sign-out").addEventListener("click", function(){
        loggedIn = false; $("#tabbar").hidden = true; closeOverlays();
        stack = ["view-welcome"]; show("view-welcome");
        toast("Signed out. See you soon, Steve.");
      });

      $("#attention-card").addEventListener("click", function(){ ensureIn(); go("view-calendar"); setCalTab("tasks"); });

      /* ================= Notifications ================= */
      $("#bell-btn").addEventListener("click", function(){
        openSheet(
          "<h3>Notifications</h3><p class=\"s-sub\">Reminders from the last few days.</p>" +
          [['var(--red-100)','var(--red-600)',"Overdue corrective action","Cupboard repair at Northgate College was due a follow-up on 12 Oct.","2h ago"],
           ['var(--amber-100)','var(--amber-600)',"Assessment awaiting review","RA-121 Campus safety & visitor routes has been a draft for 2 days.","5h ago"],
           ['var(--green-50)','var(--green-600)',"Inspection tomorrow","Hotel safety inspection at Kingsway Hotel, 09:30.","Yesterday"]]
          .map(function(n){
            return '<div class="act-row" style="padding-left:4px;padding-right:4px;"><span class="a-ic" style="background:' + n[0] + ";color:" + n[1] + ';"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg></span><div><p><b>' + n[2] + "</b> \u2014 " + n[3] + "</p><small>" + n[4] + "</small></div></div>";
          }).join("") +
          '<button class="btn btn-ghost btn-block" id="notif-done" style="margin-top:14px;">Mark all as read</button>'
        );
        $("#notif-done").addEventListener("click", function(){
          closeOverlays();
          var dot = $("#bell-btn .dot"); if(dot) dot.style.display = "none";
          toast("All notifications marked as read.");
        });
      });

      /* ================= Global navigation delegation ================= */
      document.addEventListener("click", function(e){
        var nav = e.target.closest("[data-nav]");
        if(nav){
          ensureIn();
          var target = nav.getAttribute("data-nav");
          if(target === "view-assessment-form"){ openAssessmentForm(null); }
          else if(target === "view-client-form"){ openClientForm(null); }
          else if(target === "view-inspection-form"){ fillClientSelect($("#if-client"), CLIENTS[0].id); go(target); }
          else go(target);
          if(nav.hasAttribute("data-cal-tab")) setCalTab(nav.getAttribute("data-cal-tab"));
          return;
        }
        if(e.target.closest("[data-back]")){ back(); return; }
        var cr = e.target.closest("[data-client]"); if(cr){ openClient(cr.getAttribute("data-client")); return; }
        var ar = e.target.closest("[data-assessment]"); if(ar){ openAssessment(ar.getAttribute("data-assessment")); return; }
        var ir = e.target.closest("[data-inspection]"); if(ir){ openInspection(ir.getAttribute("data-inspection")); return; }
        var rr = e.target.closest("[data-report]"); if(rr){ openReport(rr.getAttribute("data-report")); return; }
      });
      $("#tabbar").addEventListener("click", function(e){
        var b = e.target.closest("[data-tab]"); if(!b) return;
        goRoot(b.getAttribute("data-tab"));
      });
      $$(".stage-copy [data-jump]").forEach(function(b){
        b.addEventListener("click", function(){
          ensureIn();
          goRoot(b.getAttribute("data-jump"));
        });
      });

      /* ================= Initial render ================= */
      renderClients();
      renderAssessments();
      renderInspections();
      renderReports();
      updateReportsBadge();
      renderCalStrip();
      renderCalEvents();
      renderTasks();
      fillClientSelect($("#if-client"), CLIENTS[0].id);
      // Pre-answer part of today's checklist so progress feels real
      checklistState["0-0"] = {state:"pass", note:""};
      checklistState["0-1"] = {state:"pass", note:""};
      checklistState["0-2"] = {state:"pass", note:""};
      checklistState["1-0"] = {state:"fail", note:"Damaged cupboard door in a shared staff area. Area cordoned off; repair booked for 30 Oct 2026."};
      renderChecklist();
      // Pre-populate the assessment detail (RA-122, Elm Court fire safety) so deep links never show placeholder content
      openAssessment("a4");
      // Pre-populate the report preview with RPT-2042 for the same reason
      openReport("r1");
      stack = ["view-welcome"]; show("view-welcome");
    })();
    