import {
  Paper, Typography, Stack, Accordion, AccordionSummary, AccordionDetails,
  Divider, Box, Chip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function dateText(d) {
  if (!d) return "";
  // 2025-08-29T09:41:41.789411 -> yerel kısa tarih
  try {
    return new Date(d).toLocaleString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(d);
  }
}

function chipColor(status) {
  const s = (status || "").toUpperCase();
  if (["DELIVERED", "COMPLETED"].includes(s)) return "success";
  if (["PAID", "SHIPPED", "PROCESSING"].includes(s)) return "primary";
  if (["CANCELLED", "CANCELED", "FAILED"].includes(s)) return "error";
  if (["PENDING"].includes(s)) return "warning";
  return "default";
}

export default function OrdersSection({ orders, loading }) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Orders</Typography>

      {loading ? (
        <Typography color="text.secondary">Loading...</Typography>
      ) : !orders || orders.length === 0 ? (
        <Typography color="text.secondary">Henüz siparişiniz yok.</Typography>
      ) : (
        <Stack spacing={1.5}>
          {orders.map((o) => {
            // Alan eşleştirmeleri
            const code = o.orderCode || o.id;
            const when = o.orderDate || o.date;
            const total = o.price ?? o.total ?? 0;
            const status = o.status || "";

            // Adres (address/adress + alanlar)
            const addr = o.address || o.adress || {};
            const fullName = addr.fullName || addr.title || "";
            const city = addr.city || "";
            const district = addr.district || "";
            const street = addr.street || "";
            const avunue = addr.avunue || addr.avenue || ""; // yazım farkı
            const eno = addr.eno;
            const ino = addr.ino;
            const zip = addr.zip || "";
            const country = addr.country || "Türkiye";
            const phone = addr.phone || "";

            // Items (orderItemList/items)
            const items = Array.isArray(o.orderItemList)
              ? o.orderItemList
              : Array.isArray(o.items)
              ? o.items
              : [];

            return (
              <Accordion key={code}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {code}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dateText(when)}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip
                        label={status || "—"}
                        size="small"
                        color={chipColor(status)}
                      />
                      <Typography sx={{ minWidth: 90, textAlign: "right" }}>
                        ${Number(total).toFixed(2)}
                      </Typography>
                    </Stack>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: 3,
                    }}
                  >
                    {/* Adres */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
                        Shipping Address
                      </Typography>
                      <Divider sx={{ mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {fullName && <>{fullName}<br /></>}
                        {street && <>{street}<br /></>}
                        {avunue && <> {avunue}<br /></>}
                        {(district || city || zip) && (
                          <>
                            {district}{district && city ? ", " : ""}{city} {zip}<br />
                          </>
                        )}
                        {country && <>{country}<br /></>}
                        {(eno || ino) && <>Dış kapı: {eno ?? "-"}, İç kapı: {ino ?? "-"}<br /></>}
                        {phone && <>{phone}</>}
                      </Typography>
                    </Box>

                    <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />

                    {/* Items */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
                        Items
                      </Typography>
                      <Divider sx={{ mb: 1 }} />
                      {items.length === 0 ? (
                        <Typography color="text.secondary">Ürün bulunamadı.</Typography>
                      ) : (
                        <Stack spacing={1}>
                          {items.map((it, idx) => {
                            const title = it.title || it.productName || `Item #${idx + 1}`;
                            const qty = it.qty ?? it.quantity ?? 1;
                            const price = it.price ?? it.priceAtOrdersTime ?? 0;
                            const img = it.img || it.productImage || it.thumbnail;
                            return (
                              <Stack key={it.id ?? idx} direction="row" spacing={2} alignItems="center">
                                {img ? (
                                  <Box
                                    component="img"
                                    src={img}
                                    alt={title}
                                    sx={{ width: 56, height: 56, borderRadius: 1, objectFit: "cover" }}
                                  />
                                ) : (
                                  <Box sx={{ width: 56, height: 56, borderRadius: 1, bgcolor: "action.hover" }} />
                                )}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography noWrap>{title}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Qty: {qty}
                                  </Typography>
                                </Box>
                                <Typography>
                                  ${(Number(qty) * Number(price)).toFixed(2)}
                                </Typography>
                              </Stack>
                            );
                          })}
                        </Stack>
                      )}
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
      )}
    </Paper>
  );
}
