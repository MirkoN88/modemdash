module("luci.controller.modemdash", package.seeall)

function index()
    entry({"admin", "network", "modemdash"}, template("modemdash/main"), _("Modem Dashboard"), 90)
    entry({"admin", "network", "modemdash", "data"}, call("action_data")).leaf = true
end

function action_data()
    local util = require "luci.util"
    local raw = util.exec("/usr/bin/modemdash-data.sh")

    luci.http.prepare_content("application/json")
    luci.http.write(raw)
end
