include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI: Modem Dashboard 5G
LUCI_DEPENDS:=+luci-base
LUCI_PKGARCH:=all

PKG_NAME:=modemdash
PKG_VERSION:=1.0
PKG_RELEASE:=1

include $(TOPDIR)/feeds/luci/luci.mk

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/controller
	$(INSTALL_BIN) ./luasrc/controller/modemdash.lua $(1)/usr/lib/lua/luci/controller/
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/view/modemdash
	$(INSTALL_DATA) ./luasrc/view/modemdash/main.htm $(1)/usr/lib/lua/luci/view/modemdash/

	$(INSTALL_DIR) $(1)/www/luci-static/resources/modemdash
	$(INSTALL_DATA) ./htdocs/luci-static/resources/modemdash/modemdash.js $(1)/www/luci-static/resources/modemdash/

	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./root/usr/bin/modemdash-data.sh $(1)/usr/bin/
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
