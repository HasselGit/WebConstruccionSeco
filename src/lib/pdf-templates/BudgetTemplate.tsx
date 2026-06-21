import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  header: { borderBottom: '2px solid #0f172a', paddingBottom: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0f172a' },
  subtitle: { fontSize: 12, color: '#64748b', marginTop: 4 },
  section: { margin: 10, padding: 10 },
  table: { display: "flex", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { flexDirection: "row" },
  tableColHeader: { width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, backgroundColor: '#f8fafc' },
  tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCellHeader: { margin: 5, fontSize: 10, fontWeight: 'bold', color: '#0f172a' },
  tableCell: { margin: 5, fontSize: 10, color: '#334155' },
  totalSection: { marginTop: 20, paddingTop: 10, borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' },
  totalText: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' }
});

export const BudgetTemplate = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>PRESUPUESTO TÉCNICO</Text>
        <Text style={styles.subtitle}>Cliente: {data.clientName || 'Cliente No Especificado'}</Text>
        <Text style={styles.subtitle}>Proyecto: {data.projectDescription || 'Descripción No Especificada'}</Text>
        <Text style={styles.subtitle}>Fecha: {new Date().toLocaleDateString()}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableColHeader, width: '40%' }}><Text style={styles.tableCellHeader}>Sistema / Producto</Text></View>
          <View style={{ ...styles.tableColHeader, width: '20%' }}><Text style={styles.tableCellHeader}>Cantidad</Text></View>
          <View style={{ ...styles.tableColHeader, width: '20%' }}><Text style={styles.tableCellHeader}>Precio Unitario</Text></View>
          <View style={{ ...styles.tableColHeader, width: '20%' }}><Text style={styles.tableCellHeader}>Subtotal</Text></View>
        </View>
        {data.items?.map((item: any, i: number) => (
          <View style={styles.tableRow} key={i}>
            <View style={{ ...styles.tableCol, width: '40%' }}><Text style={styles.tableCell}>{item.name}</Text></View>
            <View style={{ ...styles.tableCol, width: '20%' }}><Text style={styles.tableCell}>{item.quantity}</Text></View>
            <View style={{ ...styles.tableCol, width: '20%' }}><Text style={styles.tableCell}>${(item.price || 0).toFixed(2)}</Text></View>
            <View style={{ ...styles.tableCol, width: '20%' }}><Text style={styles.tableCell}>${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</Text></View>
          </View>
        ))}
      </View>
      <View style={styles.totalSection}>
        <Text style={styles.totalText}>TOTAL: ${data.total?.toFixed(2) || '0.00'}</Text>
      </View>
    </Page>
  </Document>
);
